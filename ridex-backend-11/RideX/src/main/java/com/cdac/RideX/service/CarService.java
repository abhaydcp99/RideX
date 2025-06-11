package com.cdac.RideX.service;

import com.cdac.RideX.entity.Car;
import com.cdac.RideX.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {
    
    private final CarRepository carRepository;
    
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    
    public List<Car> getAvailableCars() {
        return carRepository.findByAvailableTrue();
    }
    
    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }
    
    public List<Car> getCarsByBrand(String brand) {
        return carRepository.findByBrandIgnoreCase(brand);
    }
    
    public List<Car> getCarsByFuelType(String fuelType) {
        return carRepository.findByFuelTypeIgnoreCase(fuelType);
    }
    
    public List<Car> getCarsByTransmission(String transmission) {
        return carRepository.findByTransmissionIgnoreCase(transmission);
    }
    
    public List<Car> getAvailableCarsWithFilters(String brand, String fuelType, String transmission) {
        return carRepository.findAvailableCarsWithFilters(brand, fuelType, transmission);
    }
    
    public Car createCar(Car car) {
        return carRepository.save(car);
    }
    
    public Car updateCar(Long id, Car updatedCar) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setName(updatedCar.getName());
                    car.setBrand(updatedCar.getBrand());
                    car.setModel(updatedCar.getModel());
                    car.setYear(updatedCar.getYear());
                    car.setFuelType(updatedCar.getFuelType());
                    car.setTransmission(updatedCar.getTransmission());
                    car.setSeatingCapacity(updatedCar.getSeatingCapacity());
                    car.setPricePerDay(updatedCar.getPricePerDay());
                    car.setImageUrl(updatedCar.getImageUrl());
                    car.setAvailable(updatedCar.getAvailable());
                    car.setDescription(updatedCar.getDescription());
                    return carRepository.save(car);
                })
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }
    
    public void deleteCar(Long id) {
        if (!carRepository.existsById(id)) {
            throw new RuntimeException("Car not found");
        }
        carRepository.deleteById(id);
    }
    
    public Car updateCarAvailability(Long id, boolean available) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setAvailable(available);
                    return carRepository.save(car);
                })
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }
}