package com.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne @JoinColumn(name = "passenger_id")
    private Passenger passenger; // Main Booker

    @ManyToOne @JoinColumn(name = "trip_id")
    private Trip trip;

    @ManyToOne @JoinColumn(name = "source_stop_id")
    private Stop sourceStop;

    @ManyToOne @JoinColumn(name = "destination_stop_id")
    private Stop destinationStop;

    private java.time.LocalDateTime bookingTime;
    private double totalAmount;
    private String bookingStatus;
}
