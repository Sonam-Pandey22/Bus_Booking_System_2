package com.backend.backend.Controller;

import com.backend.backend.Entity.Trip;
import com.backend.backend.Service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200")
public class TripController {

    @Autowired
    private TripService tripService;


    @GetMapping("/search")
    public ResponseEntity<List<Trip>> searchTrips(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        try {
            List<Trip> trips = tripService.findTrips(from, to, date);

            if (trips.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(trips);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }


    }
}