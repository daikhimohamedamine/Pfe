package com.medical.controller;

import com.medical.entity.Acte;
import com.medical.service.ActeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actes")
@CrossOrigin(origins = "http://localhost:4200")
public class ActeController {

    @Autowired
    private ActeService acteService;

    @GetMapping
    public ResponseEntity<List<Acte>> getAllActes() {
        return ResponseEntity.ok(acteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Acte> getActeById(@PathVariable Long id) {
        return acteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<Acte>> getActesByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(acteService.findByEmployeId(employeId));
    }

    @PostMapping
    public ResponseEntity<Acte> createActe(@RequestBody Acte acte) {
        return ResponseEntity.status(HttpStatus.CREATED).body(acteService.save(acte));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Acte> updateActe(@PathVariable Long id, @RequestBody Acte acte) {
        try {
            return ResponseEntity.ok(acteService.update(id, acte));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActe(@PathVariable Long id) {
        if (acteService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        acteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
