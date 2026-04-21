package com.medical.controller;

import com.medical.entity.Rappel;
import com.medical.service.RappelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rappels")
@CrossOrigin(origins = "http://localhost:4200")
public class RappelController {

    @Autowired
    private RappelService rappelService;

    @GetMapping
    public ResponseEntity<List<Rappel>> getAllRappels() {
        return ResponseEntity.ok(rappelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rappel> getRappelById(@PathVariable Long id) {
        return rappelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<Rappel>> getRappelsByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(rappelService.findByEmployeId(employeId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Rappel>> getRappelsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(rappelService.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Rappel> createRappel(@RequestBody Rappel rappel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rappelService.save(rappel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rappel> updateRappel(@PathVariable Long id, @RequestBody Rappel rappel) {
        try {
            return ResponseEntity.ok(rappelService.update(id, rappel));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRappel(@PathVariable Long id) {
        if (rappelService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        rappelService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
