package com.medical.controller;

import com.medical.entity.Medecin;
import com.medical.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medecins")
@CrossOrigin(origins = "http://localhost:4200")
public class MedecinController {

    @Autowired
    private MedecinService medecinService;

    @GetMapping
    public ResponseEntity<List<Medecin>> getAllMedecins() {
        return ResponseEntity.ok(medecinService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medecin> getMedecinById(@PathVariable Long id) {
        return medecinService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Medecin> getMedecinByUserId(@PathVariable Long userId) {
        return medecinService.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Medecin> createMedecin(@RequestBody Medecin medecin) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medecinService.save(medecin));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medecin> updateMedecin(@PathVariable Long id, @RequestBody Medecin medecin) {
        try {
            return ResponseEntity.ok(medecinService.update(id, medecin));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedecin(@PathVariable Long id) {
        if (medecinService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        medecinService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
