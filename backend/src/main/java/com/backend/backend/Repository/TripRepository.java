package com.backend.backend.Repository;

import com.backend.backend.Entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    // Custom query to find trips between two stops in a route
    @Query("SELECT DISTINCT t FROM Trip t " +
            "JOIN t.route r " +
            "JOIN r.routeStops rs1 " +
            "JOIN r.routeStops rs2 " +
            "WHERE t.tripDate = :date " +
            "AND rs1.stop.city LIKE %:from% " +
            "AND rs2.stop.city LIKE %:to% " +
            "AND rs1.sequenceOrder < rs2.sequenceOrder")
    List<Trip> searchTrips(@Param("from") String from,
                           @Param("to") String to,
                           @Param("date") LocalDate date);
}
