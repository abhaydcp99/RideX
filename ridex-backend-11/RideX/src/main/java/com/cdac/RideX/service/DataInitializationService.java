package com.cdac.RideX.service;

import com.cdac.RideX.entity.Car;
import com.cdac.RideX.entity.User;
import com.cdac.RideX.repository.CarRepository;
import com.cdac.RideX.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DataInitializationService implements CommandLineRunner {
    
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeCars();
    }
    
    private void initializeUsers() {
        if (userRepository.count() == 0) {
            User demoUser = new User();
            demoUser.setFullName("Demo User");
            demoUser.setEmail("demo@example.com");
            demoUser.setPassword("demo123");
            demoUser.setMobile("9876543210");
            userRepository.save(demoUser);
            
            User adminUser = new User();
            adminUser.setFullName("Admin User");
            adminUser.setEmail("admin@ridex.com");
            adminUser.setPassword("admin123");
            adminUser.setMobile("9876543211");
            userRepository.save(adminUser);
        }
    }
    
    private void initializeCars() {
        if (carRepository.count() == 0) {
            // Car 1
            Car car1 = new Car();
            car1.setName("Maruti Swift");
            car1.setBrand("Maruti");
            car1.setModel("Swift");
            car1.setYear(2023);
            car1.setFuelType("Petrol");
            car1.setTransmission("Manual");
            car1.setSeatingCapacity(5);
            car1.setPricePerDay(new BigDecimal("2500"));
            car1.setImageUrl("/images/car-1.jpg");
            car1.setAvailable(true);
            car1.setDescription("Compact and fuel-efficient car perfect for city driving");
            carRepository.save(car1);
            
            // Car 2
            Car car2 = new Car();
            car2.setName("Hyundai Creta");
            car2.setBrand("Hyundai");
            car2.setModel("Creta");
            car2.setYear(2023);
            car2.setFuelType("Diesel");
            car2.setTransmission("Automatic");
            car2.setSeatingCapacity(5);
            car2.setPricePerDay(new BigDecimal("4500"));
            car2.setImageUrl("/images/car-2.jpg");
            car2.setAvailable(true);
            car2.setDescription("Premium SUV with advanced features and comfort");
            carRepository.save(car2);
            
            // Car 3
            Car car3 = new Car();
            car3.setName("Honda City");
            car3.setBrand("Honda");
            car3.setModel("City");
            car3.setYear(2022);
            car3.setFuelType("Petrol");
            car3.setTransmission("Automatic");
            car3.setSeatingCapacity(5);
            car3.setPricePerDay(new BigDecimal("3500"));
            car3.setImageUrl("/images/car-3.jpg");
            car3.setAvailable(true);
            car3.setDescription("Elegant sedan with spacious interior and smooth performance");
            carRepository.save(car3);
            
            // Car 4
            Car car4 = new Car();
            car4.setName("Mahindra Thar");
            car4.setBrand("Mahindra");
            car4.setModel("Thar");
            car4.setYear(2023);
            car4.setFuelType("Diesel");
            car4.setTransmission("Manual");
            car4.setSeatingCapacity(4);
            car4.setPricePerDay(new BigDecimal("5500"));
            car4.setImageUrl("/images/car-4.jpg");
            car4.setAvailable(true);
            car4.setDescription("Rugged off-road vehicle perfect for adventure trips");
            carRepository.save(car4);
            
            // Car 5
            Car car5 = new Car();
            car5.setName("Toyota Innova");
            car5.setBrand("Toyota");
            car5.setModel("Innova Crysta");
            car5.setYear(2022);
            car5.setFuelType("Diesel");
            car5.setTransmission("Manual");
            car5.setSeatingCapacity(8);
            car5.setPricePerDay(new BigDecimal("6000"));
            car5.setImageUrl("/images/car-5.jpg");
            car5.setAvailable(true);
            car5.setDescription("Spacious MPV ideal for family trips and group travel");
            carRepository.save(car5);
            
            // Car 6
            Car car6 = new Car();
            car6.setName("Tata Nexon");
            car6.setBrand("Tata");
            car6.setModel("Nexon");
            car6.setYear(2023);
            car6.setFuelType("Electric");
            car6.setTransmission("Automatic");
            car6.setSeatingCapacity(5);
            car6.setPricePerDay(new BigDecimal("4000"));
            car6.setImageUrl("/images/car-6.jpg");
            car6.setAvailable(true);
            car6.setDescription("Eco-friendly electric SUV with modern technology");
            carRepository.save(car6);
        }
    }
}