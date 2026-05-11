package com.backend.backend.Repository;

import com.backend.backend.Entity.BusPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface BusPointRepository extends JpaRepository<BusPoint, Long> {

    /**
     * Kisi specific bus ke saare boarding aur dropping points nikalne ke liye.
     * Spring Data JPA 'findByBusId' ko automatic SQL query mein convert kar dega.
     */
    List<BusPoint> findByBusId(Long busId);

    /**
     * Specific bus ke points ko 'type' (BOARDING/DROPPING) ke hisab se filter karne ke liye.
     * Isse aap backend se hi filtered data la sakte hain.
     */
    List<BusPoint> findByBusIdAndType(Long busId, String type);

    /**
     * Points ko unke 'time' ke order mein laane ke liye (ascending order).
     */
    List<BusPoint> findByBusIdOrderByTimeAsc(Long busId);
}