package com.cdac.RideX.repository;

import com.cdac.RideX.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    
    List<Car> findByAvailableTrue();
    
    List<Car> findByBrandIgnoreCase(String brand);
    
    List<Car> findByFuelTypeIgnoreCase(String fuelType);
    
    List<Car> findByTransmissionIgnoreCase(String transmission);
    
    @Query("SELECT c FROM Car c WHERE c.available = true AND " +
           "(:brand IS NULL OR LOWER(c.brand) = LOWER(:brand)) AND " +
           "(:fuelType IS NULL OR LOWER(c.fuelType) = LOWER(:fuelType)) AND " +
           "(:transmission IS NULL OR LOWER(c.transmission) = LOWER(:transmission))")
    List<Car> findAvailableCarsWithFilters(@Param("brand") String brand,
                                          @Param("fuelType") String fuelType,
                                          @Param("transmission") String transmission);
}