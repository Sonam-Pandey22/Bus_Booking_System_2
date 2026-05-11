package com.backend.backend.Repository;

import com.backend.backend.Entity.Fare;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FareRepository extends JpaRepository<Fare, Long> {

    Optional<Fare> findByRouteRouteIdAndFromStopStopIdAndToStopStopIdAndSeatType(
            Long routeId, Long fromStopId, Long toStopId, String seatType);
}
