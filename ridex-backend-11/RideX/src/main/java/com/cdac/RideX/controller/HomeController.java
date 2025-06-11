package com.cdac.RideX.controller;

import com.cdac.RideX.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000", "http://localhost:3001" })
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<ApiResponse<Map<String, Object>>> home() {
        Map<String, Object> info = new HashMap<>();
        info.put("application", "RideX API");
        info.put("version", "1.0.0");
        info.put("status", "Running");
        info.put("description", "Car Rental Service API");

        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("Authentication", "/api/auth");
        endpoints.put("Cars", "/api/cars");
        endpoints.put("Bookings", "/api/bookings");
        endpoints.put("Users", "/api/users");

        info.put("endpoints", endpoints);

        return ResponseEntity.ok(ApiResponse.success("Welcome to RideX API", info));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, String>>> health() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("database", "Connected");
        health.put("timestamp", java.time.LocalDateTime.now().toString());

        return ResponseEntity.ok(ApiResponse.success("Health Check", health));
    }

    @GetMapping("/api")
    public ResponseEntity<ApiResponse<Map<String, Object>>> apiInfo() {
        Map<String, Object> apiInfo = new HashMap<>();
        apiInfo.put("name", "RideX API");
        apiInfo.put("version", "1.0.0");
        apiInfo.put("description", "RESTful API for Car Rental Service");

        Map<String, String> availableEndpoints = new HashMap<>();
        availableEndpoints.put("POST /api/auth/register", "Register a new user");
        availableEndpoints.put("POST /api/auth/login", "User login");
        availableEndpoints.put("GET /api/cars/available", "Get available cars");
        availableEndpoints.put("GET /api/cars/{id}", "Get car by ID");
        availableEndpoints.put("POST /api/bookings/user/{userId}", "Create booking");
        availableEndpoints.put("GET /api/bookings/user/{userId}", "Get user bookings");

        apiInfo.put("endpoints", availableEndpoints);

        return ResponseEntity.ok(ApiResponse.success("API Information", apiInfo));
    }
}