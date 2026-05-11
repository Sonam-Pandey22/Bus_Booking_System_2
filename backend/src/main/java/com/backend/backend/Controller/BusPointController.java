package com.backend.backend.Controller;

import com.backend.backend.Entity.BusPoint;
import com.backend.backend.Repository.BusPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/points")
@CrossOrigin(origins = "http://localhost:4200") // Angular frontend ke liye CORS enable karna zaroori hai
public class BusPointController {

    @Autowired
    private BusPointRepository repository;

    /**
     * Get all boarding and dropping points for a specific bus.
     * URL: GET http://localhost:8080/api/points/{busId}
     */
    @GetMapping("/{busId}")
    public ResponseEntity<List<BusPoint>> getPointsByBus(@PathVariable Long busId) {
        List<BusPoint> points = repository.findByBusId(busId);

        if (points.isEmpty()) {
            // Agar koi points nahi milte toh 204 No Content ya 404 bhej sakte hain
            return ResponseEntity.noContent().build();
        }

        // Success case mein points ke saath 200 OK bhejenge
        return ResponseEntity.ok(points);
    }

    /**
     * Optional: Sirf Boarding ya sirf Dropping points filter karke mangwane ke liye.
     * URL: GET http://localhost:8080/api/points/{busId}/filter?type=BOARDING
     */
    @GetMapping("/{busId}/filter")
    public ResponseEntity<List<BusPoint>> getPointsByType(
            @PathVariable Long busId,
            @RequestParam String type) {

        List<BusPoint> filteredPoints = repository.findByBusIdAndType(busId, type.toUpperCase());
        return ResponseEntity.ok(filteredPoints);
    }
}