package com.backend.backend.Repository;

import com.backend.backend.Entity.Seat; // Seat Entity ka path
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long>{


    List<Seat> findByBus_BusId(Long busId);


    List<Seat> findByBus_BusIdAndBookedFalse(Long busId);


    @Transactional
    @Modifying
    @Query("UPDATE Seat s SET s.booked = true WHERE s.seatId IN :seatIds")
    void markSeatsAsBooked(@Param("seatIds") List<Long> seatIds);


    List<Seat> findByBus_BusIdAndDeckType(Long busId, String deckType);
}