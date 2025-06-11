/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getBookings, cancelBooking } from '../utils/bookingUtils';
import { isAuthenticated, getCurrentUser } from '../utils/authUtils';
import { fetchCars } from '../utils/api';
import BookingModal from './BookingModal';

export default function Rides() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [capacity, setCapacity] = useState('all');
  const [brand, setBrand] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const carsData = await fetchCars();
      setCars(carsData);
      if (isAuthenticated()) {
        const user = getCurrentUser();
        const userBookings = await getBookings(user.id);
        setBookings(userBookings);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const filteredCars = cars
    .filter(car => {
      const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        priceRange === 'all'
          ? true
          : priceRange === 'low'
          ? car.pricePerDay < 500
          : priceRange === 'mid'
          ? car.pricePerDay >= 500 && car.pricePerDay < 1000
          : car.pricePerDay >= 1000;
      const matchesCapacity = capacity === 'all' ? true : car.seatingCapacity === parseInt(capacity);
      const matchesBrand = brand === 'all' ? true : car.brand === brand;
      return matchesSearch && matchesPrice && matchesCapacity && matchesBrand;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.model.localeCompare(b.model);
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'capacity') return a.seatingCapacity - b.seatingCapacity;
      return 0;
    });

  const handleBookingClick = (car) => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCancelBooking = async (bookingId) => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    try {
      await cancelBooking(bookingId);
      loadInitialData();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const getCarBookingStatus = (carId) => {
    const carBooking = bookings.find(booking => booking.car.id === carId);
    if (!carBooking) return { status: 'available' };

    const currentUser = getCurrentUser();
    if (currentUser && carBooking.user.id === currentUser.id) {
      return {
        status: 'self-booked',
        booking: carBooking,
      };
    }

    return { status: 'booked' };
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                className="w-full p-2 border rounded-md"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="low">Under $500</option>
                <option value="mid">$500 - $1000</option>
                <option value="high">Above $1000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <select
                className="w-full p-2 border rounded-md"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              >
                <option value="all">All Capacities</option>
                <option value="2">2 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="8">8 People</option>
                <option value="9">9 People</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                className="w-full p-2 border rounded-md"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="all">All Brands</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Tesla">Tesla</option>
                <option value="Porsche">Porsche</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Lexus">Lexus</option>
                <option value="Genesis">Genesis</option>
                <option value="Volvo">Volvo</option>
                <option value="Maserati">Maserati</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                className="w-full p-2 border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="capacity">Capacity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={car.imageUrl || '/images/car-1.jpg'}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <p className="text-lg font-semibold text-blue-600">${car.pricePerDay}/day</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {car.seatingCapacity} People
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {car.fuelType}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Details:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {car.brand}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {car.transmission}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {car.year}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {car.available ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {(() => {
                    const bookingStatus = getCarBookingStatus(car.id)
                    
                    if (bookingStatus.status === 'self-booked') {
                      return (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Your booking: {new Date(bookingStatus.booking.startDate).toLocaleDateString()} - 
                            {new Date(bookingStatus.booking.endDate).toLocaleDateString()}
                          </p>
                          <button
                            className="w-full px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-600"
                            onClick={() => handleCancelBooking(bookingStatus.booking.id)}
                          >
                            Cancel Booking
                          </button>
                        </div>
                      )
                    }
                    
                    if (bookingStatus.status === 'booked') {
                      return (
                        <button
                          className="w-full px-4 py-2 rounded-md text-white font-medium bg-gray-400 cursor-not-allowed"
                          disabled
                        >
                          Currently Booked
                        </button>
                      )
                    }
                    
                    return (
                      <button
                        className="w-full px-4 py-2 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleBookingClick(car)}
                      >
                        Rent Now
                      </button>
                    )
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add the BookingModal */}
        {selectedCar && (
          <BookingModal
            car={selectedCar}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedCar(null)
            }}
          />
        )}

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
} 