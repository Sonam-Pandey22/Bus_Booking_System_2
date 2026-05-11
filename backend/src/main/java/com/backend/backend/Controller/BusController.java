package com.backend.backend.Controller;

import com.backend.backend.Entity.Bus;
import com.backend.backend.Repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "http://localhost:4200")
public class BusController {

    @Autowired
    private BusRepository busRepository;


    @PostMapping("/add")
    public Bus addBus(@RequestBody Bus bus) {

        return busRepository.save(bus);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteBus(@PathVariable Long id) {

        busRepository.deleteById(id);
    }
    @PutMapping("/update")
    public Bus updateBus(@RequestBody Bus bus) {

        return busRepository.save(bus);
    }
    @GetMapping("/all")
    public List<Bus> getAllBuses() {

        return busRepository.findAll();
    }

}