package com.medical.controller;

import com.medical.entity.Examen;
import com.medical.service.ExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/examens")
@CrossOrigin(origins = "http://localhost:4200")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @GetMapping
    public ResponseEntity<List<Examen>> getAllExamens() {
        return ResponseEntity.ok(examenService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Examen> getExamenById(@PathVariable Long id) {
        return examenService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<Examen>> getExamensByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(examenService.findByEmployeId(employeId));
    }

    @PostMapping
    public ResponseEntity<Examen> createExamen(@RequestBody Examen examen) {
        return ResponseEntity.status(HttpStatus.CREATED).body(examenService.save(examen));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Examen> updateExamen(@PathVariable Long id, @RequestBody Examen examen) {
        try {
            return ResponseEntity.ok(examenService.update(id, examen));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamen(@PathVariable Long id) {
        if (examenService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        examenService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
