package com.cdac.RideX.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long carId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String pickupLocation;
    private String dropLocation;
    private BigDecimal totalAmount;
    private String notes;
}