package com.backend.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.backend.backend.Repository.SeatRepository;
import com.backend.backend.Entity.Seat;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getSeatsByBusId(Long busId) {
        // Aap yahan check kar sakte hain ki seats empty toh nahi hain
        List<Seat> seats = seatRepository.findByBus_BusId(busId);

        if (seats.isEmpty()) {
            System.out.println("No seats found for Bus ID: " + busId);
        }

        return seats;
    }

    public List<Seat> getAvailableSeats(Long busId) {
        // Yahan 'Booked' word use karein, 'IsBooked' nahi
        return seatRepository.findByBus_BusIdAndBookedFalse(busId);
    }
}