package com.cdac.RideX.repository;

import com.cdac.RideX.entity.Booking;
import com.cdac.RideX.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUser(User user);
    
    List<Booking> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT b FROM Booking b JOIN FETCH b.car JOIN FETCH b.user WHERE b.user = :user ORDER BY b.createdAt DESC")
    List<Booking> findByUserWithCarAndUserDetails(@Param("user") User user);
    
    @Query("SELECT b FROM Booking b WHERE b.car.id = :carId AND " +
           "b.status != 'CANCELLED' AND " +
           "((b.startDate <= :endDate) AND (b.endDate >= :startDate))")
    List<Booking> findConflictingBookings(@Param("carId") Long carId,
                                         @Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.status = :status")
    List<Booking> findByStatus(@Param("status") Booking.BookingStatus status);
}