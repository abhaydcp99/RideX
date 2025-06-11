/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addBooking, isCarAvailable } from '../utils/bookingUtils'
import { isAuthenticated, getCurrentUser } from '../utils/authUtils'
import SuccessModal from './SuccessModal'

export default function BookingModal({ car, isOpen, onClose }) {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropLocation: '',
    notes: ''
  })
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const calculateTotalPrice = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return (car.pricePerDay * days).toFixed(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setError('Pick-up date cannot be in the past');
      return;
    }

    if (end <= start) {
      setError('Return date must be after pick-up date');
      return;
    }

    const carAvailable = await isCarAvailable(car.model, bookingData.startDate, bookingData.endDate);
    if (!carAvailable) {
      setError('Car is not available for selected dates');
      return;
    }

    const user = getCurrentUser();
    const booking = {
      carId: car.id,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      pickupLocation: bookingData.pickupLocation,
      dropLocation: bookingData.dropLocation,
      totalAmount: parseFloat(calculateTotalPrice()),
      notes: bookingData.notes
    };

    try {
      await addBooking(user.id, booking);
      setShowSuccess(true);
    } catch (error) {
      setError('Failed to create booking. Please try again.');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
    // Redirect to MyBookings page after successful booking
    navigate('/bookings')
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Book {car.name}</h2>
              <p className="text-gray-600">{car.brand} • {car.year} • {car.fuelType}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Car Details */}
            <div>
              <img
                src={car.imageUrl || '/images/car-1.jpg'}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Specifications:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Capacity: {car.seatingCapacity} People</p>
                    <p>Fuel Type: {car.fuelType}</p>
                    <p>Transmission: {car.transmission}</p>
                    <p>Base Price: ${car.pricePerDay}/day</p>
                  </div>
                </div>
                {car.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description:</h3>
                    <p className="text-sm text-gray-600">{car.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block mb-1">Pick-up Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingData.startDate}
                    onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block mb-1">Return Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    required
                    min={bookingData.startDate}
                    value={bookingData.endDate}
                    onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block mb-1">Pickup Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    required
                    placeholder="Enter pickup location"
                    value={bookingData.pickupLocation}
                    onChange={(e) => setBookingData({...bookingData, pickupLocation: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block mb-1">Drop Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    required
                    placeholder="Enter drop location"
                    value={bookingData.dropLocation}
                    onChange={(e) => setBookingData({...bookingData, dropLocation: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block mb-1">Notes (Optional)</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Any special requirements or notes"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                  />
                </div>

                {bookingData.startDate && bookingData.endDate && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Booking Summary</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Duration: {Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                      <p className="text-sm text-gray-600">
                        Base Price: ${car.pricePerDay}/day
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        Total Price: ${calculateTotalPrice()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        message="Your booking has been confirmed successfully! You can view your booking details in the My Bookings section."
      />
    </>
  )
}

BookingModal.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    fuelType: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    seatingCapacity: PropTypes.number.isRequired,
    pricePerDay: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    available: PropTypes.bool.isRequired,
    description: PropTypes.string
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}