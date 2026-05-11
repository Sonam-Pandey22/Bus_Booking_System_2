package com.backend.backend.Service;

import com.backend.backend.Entity.Trip;
import com.backend.backend.Repository.TripRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private static final Logger logger = LoggerFactory.getLogger(TripService.class);

    @Autowired
    private TripRepository tripRepository;

    /**
     * Search trips based on source city, destination city, and date.
     */
    public List<Trip> findTrips(String from, String to, LocalDate date) {
        String source = from.trim().toLowerCase();
        String destination = to.trim().toLowerCase();
        logger.info("Searching trips from {} to {} on {}", source, destination, date);

        try {

            return tripRepository.searchTrips(source, destination, date);
        } catch (Exception e) {
            logger.error("Error: {}", e.getMessage());
            throw new RuntimeException("Could not fetch trips at this moment.");
        }
    }

    /**
     * Get details of a specific trip by its ID (Used for booking).
     */
    public Optional<Trip> getTripById(Long id) {
        logger.info("Fetching trip details for ID: {}", id);
        return tripRepository.findById(id);
    }

    /**
     * Optional: Update trip seats (Useful when a booking is confirmed).
     */
    @Transactional
    public void updateTripDetails(Trip trip) {
        tripRepository.save(trip);
    }
}