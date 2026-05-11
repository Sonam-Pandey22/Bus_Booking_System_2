package com.backend.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Fare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fareId;

    @ManyToOne @JoinColumn(name = "route_id")
    private Route route;

    @ManyToOne @JoinColumn(name = "from_stop_id")
    private Stop fromStop;

    @ManyToOne @JoinColumn(name = "to_stop_id")
    private Stop toStop;

    private String seatType;
    private double price;
}