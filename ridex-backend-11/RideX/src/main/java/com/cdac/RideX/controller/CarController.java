package com.cdac.RideX.controller;

import com.cdac.RideX.dto.ApiResponse;
import com.cdac.RideX.entity.Car;
import com.cdac.RideX.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000", "http://localhost:3001" })
public class CarController {

    private final CarService carService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Car>>> getAllCars() {
        try {
            List<Car> cars = carService.getAllCars();
            return ResponseEntity.ok(ApiResponse.success(cars));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<Car>>> getAvailableCars(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission) {
        try {
            List<Car> cars;
            if (brand != null || fuelType != null || transmission != null) {
                cars = carService.getAvailableCarsWithFilters(brand, fuelType, transmission);
            } else {
                cars = carService.getAvailableCars();
            }
            return ResponseEntity.ok(ApiResponse.success(cars));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Car>> getCarById(@PathVariable Long id) {
        try {
            return carService.getCarById(id)
                    .map(car -> ResponseEntity.ok(ApiResponse.success(car)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Car>> createCar(@RequestBody Car car) {
        try {
            Car createdCar = carService.createCar(car);
            return ResponseEntity.ok(ApiResponse.success("Car created successfully", createdCar));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Car>> updateCar(@PathVariable Long id, @RequestBody Car car) {
        try {
            Car updatedCar = carService.updateCar(id, car);
            return ResponseEntity.ok(ApiResponse.success("Car updated successfully", updatedCar));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<ApiResponse<Car>> updateCarAvailability(
            @PathVariable Long id,
            @RequestParam boolean available) {
        try {
            Car updatedCar = carService.updateCarAvailability(id, available);
            return ResponseEntity.ok(ApiResponse.success("Car availability updated", updatedCar));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCar(@PathVariable Long id) {
        try {
            carService.deleteCar(id);
            return ResponseEntity.ok(ApiResponse.success("Car deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<ApiResponse<List<Car>>> getCarsByBrand(@PathVariable String brand) {
        try {
            List<Car> cars = carService.getCarsByBrand(brand);
            return ResponseEntity.ok(ApiResponse.success(cars));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/fuel/{fuelType}")
    public ResponseEntity<ApiResponse<List<Car>>> getCarsByFuelType(@PathVariable String fuelType) {
        try {
            List<Car> cars = carService.getCarsByFuelType(fuelType);
            return ResponseEntity.ok(ApiResponse.success(cars));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/transmission/{transmission}")
    public ResponseEntity<ApiResponse<List<Car>>> getCarsByTransmission(@PathVariable String transmission) {
        try {
            List<Car> cars = carService.getCarsByTransmission(transmission);
            return ResponseEntity.ok(ApiResponse.success(cars));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}