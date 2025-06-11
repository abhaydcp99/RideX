package com.cdac.RideX.service;

import com.cdac.RideX.dto.BookingRequest;
import com.cdac.RideX.entity.Booking;
import com.cdac.RideX.entity.Car;
import com.cdac.RideX.entity.User;
import com.cdac.RideX.repository.BookingRepository;
import com.cdac.RideX.repository.CarRepository;
import com.cdac.RideX.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }
    
    public List<Booking> getBookingsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public List<Booking> getBookingsByStatus(Booking.BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }
    
    @Transactional
    public Booking createBooking(Long userId, BookingRequest request) {
        // Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Validate car
        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));
        
        if (!car.getAvailable()) {
            throw new RuntimeException("Car is not available");
        }
        
        // Check for conflicting bookings
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                request.getCarId(), request.getStartDate(), request.getEndDate());
        
        if (!conflictingBookings.isEmpty()) {
            throw new RuntimeException("Car is already booked for the selected dates");
        }
        
        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setPickupLocation(request.getPickupLocation());
        booking.setDropLocation(request.getDropLocation());
        booking.setTotalAmount(request.getTotalAmount());
        booking.setNotes(request.getNotes());
        booking.setStatus(Booking.BookingStatus.PENDING);
        
        return bookingRepository.save(booking);
    }
    
    public Booking updateBookingStatus(Long id, Booking.BookingStatus status) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(status);
                    return bookingRepository.save(booking);
                })
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    public Booking updateBooking(Long id, BookingRequest request) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    // Check for conflicting bookings (excluding current booking)
                    List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                            request.getCarId(), request.getStartDate(), request.getEndDate());
                    
                    conflictingBookings.removeIf(b -> b.getId().equals(id));
                    
                    if (!conflictingBookings.isEmpty()) {
                        throw new RuntimeException("Car is already booked for the selected dates");
                    }
                    
                    booking.setStartDate(request.getStartDate());
                    booking.setEndDate(request.getEndDate());
                    booking.setPickupLocation(request.getPickupLocation());
                    booking.setDropLocation(request.getDropLocation());
                    booking.setTotalAmount(request.getTotalAmount());
                    booking.setNotes(request.getNotes());
                    
                    return bookingRepository.save(booking);
                })
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found");
        }
        bookingRepository.deleteById(id);
    }
    
    @Transactional
    public Booking cancelBooking(Long id) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    if (booking.getStatus() == Booking.BookingStatus.COMPLETED) {
                        throw new RuntimeException("Cannot cancel completed booking");
                    }
                    booking.setStatus(Booking.BookingStatus.CANCELLED);
                    return bookingRepository.save(booking);
                })
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}