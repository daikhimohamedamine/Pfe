package com.medical.controller;

import com.medical.entity.Ordonnance;
import com.medical.service.OrdonnanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordonnances")
@CrossOrigin(origins = "http://localhost:4200")
public class OrdonnanceController {

    @Autowired
    private OrdonnanceService ordonnanceService;

    @GetMapping
    public ResponseEntity<List<Ordonnance>> getAllOrdonnances() {
        return ResponseEntity.ok(ordonnanceService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ordonnance> getOrdonnanceById(@PathVariable Long id) {
        return ordonnanceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/consultation/{consultationId}")
    public ResponseEntity<List<Ordonnance>> getOrdonnancesByConsultation(@PathVariable Long consultationId) {
        return ResponseEntity.ok(ordonnanceService.findByConsultationId(consultationId));
    }

    @PostMapping
    public ResponseEntity<Ordonnance> createOrdonnance(@RequestBody Ordonnance ordonnance) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ordonnanceService.save(ordonnance));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ordonnance> updateOrdonnance(@PathVariable Long id,
                                                       @RequestBody Ordonnance ordonnance) {
        try {
            return ResponseEntity.ok(ordonnanceService.update(id, ordonnance));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdonnance(@PathVariable Long id) {
        if (ordonnanceService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ordonnanceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
