package com.backend.backend.Repository;

import com.backend.backend.Entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    // Exact method name jo Angular se match karega
    List<Bus> findByOperatorOperatorId(Long operatorId);

    Bus findByBusNumber(String busNumber);
}