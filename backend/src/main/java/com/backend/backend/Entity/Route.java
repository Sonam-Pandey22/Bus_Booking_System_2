package com.backend.backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;
    private String routeName;
    private double distanceKm;
    private int durationMinutes;

    @OneToMany(mappedBy = "route")
    @JsonManagedReference
    private List<RouteStop> routeStops;
}
