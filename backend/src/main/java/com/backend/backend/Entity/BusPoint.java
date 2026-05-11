package com.backend.backend.Entity;

import jakarta.persistence.*;
import java.time.LocalTime;

/**
 * Entity class to represent Boarding and Dropping points for a bus.
 */
@Entity
@Table(name = "bus_points")
public class BusPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long pointId;

    @Column(name = "bus_id", nullable = false)
    private Long busId;

    @Column(name = "point_name", nullable = false, length = 100)
    private String pointName;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(name = "type", nullable = false)
    private String type; // Expected values: "BOARDING" or "DROPPING"

    @Column(name = "is_popular")
    private boolean isPopular;

    // --- Constructors ---

    public BusPoint() {
    }

    public BusPoint(Long busId, String pointName, String address, LocalTime time, String type, boolean isPopular) {
        this.busId = busId;
        this.pointName = pointName;
        this.address = address;
        this.time = time;
        this.type = type;
        this.isPopular = isPopular;
    }

    // --- Getters and Setters ---

    public Long getPointId() {
        return pointId;
    }

    public void setPointId(Long pointId) {
        this.pointId = pointId;
    }

    public Long getBusId() {
        return busId;
    }

    public void setBusId(Long busId) {
        this.busId = busId;
    }

    public String getPointName() {
        return pointName;
    }

    public void setPointName(String pointName) {
        this.pointName = pointName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isPopular() {
        return isPopular;
    }

    public void setPopular(boolean isPopular) {
        this.isPopular = isPopular;
    }

    // --- toString Method (Optional for debugging) ---

    @Override
    public String toString() {
        return "BusPoint{" +
                "pointId=" + pointId +
                ", busId=" + busId +
                ", pointName='" + pointName + '\'' +
                ", type='" + type + '\'' +
                ", time=" + time +
                '}';
    }
}