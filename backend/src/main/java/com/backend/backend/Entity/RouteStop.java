package com.backend.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore; // Yeh import zaroor add karein
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeStopId;

    @ManyToOne
    @JoinColumn(name = "route_id")
    @JsonBackReference
    @ToString.Exclude
    private Route route;

    @ManyToOne
    @JoinColumn(name = "stop_id")
    private Stop stop;

    private int sequenceOrder;
}