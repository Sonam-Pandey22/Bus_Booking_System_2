package com.backend.backend.Controller;

import com.backend.backend.Entity.Seat; // Seat model ka sahi path dein
import com.backend.backend.Service.SeatService; // Seat service ka sahi path dein
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "http://localhost:4200") // Angular integration ke liye compulsory hai
public class SeatController {

    @Autowired
    private SeatService seatService;

    /**
     * Get all seats for a specific bus.
     * Endpoint: GET http://localhost:8080/api/seats/bus/{busId}
     */
    @GetMapping("/bus/{busId}")
    public ResponseEntity<List<Seat>> getSeatsByBus(@PathVariable Long busId) {
        try {
            List<Seat> seats = seatService.getSeatsByBusId(busId);

            if (seats.isEmpty()) {
                // Agar bus exist karti hai par seats nahi mili toh 204 No Content
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            // Success response (200 OK)
            return ResponseEntity.ok(seats);

        } catch (Exception e) {
            // Backend logs mein error dekhne ke liye
            System.err.println("Error fetching seats for busId " + busId + ": " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}