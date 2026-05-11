package com.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class BookingPassenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingPassengerId;

    @ManyToOne @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne @JoinColumn(name = "passenger_id")
    private Passenger passenger;

    @ManyToOne @JoinColumn(name = "seat_id")
    private Seat seat;

    @ManyToOne @JoinColumn(name = "fare_id")
    private Fare fare;

    private double price;
}
