package com.medical.controller;

import com.medical.entity.Consultation;
import com.medical.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "http://localhost:4200")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @GetMapping
    public ResponseEntity<List<Consultation>> getAllConsultations() {
        return ResponseEntity.ok(consultationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable Long id) {
        return consultationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<Consultation>> getConsultationsByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(consultationService.findByEmployeId(employeId));
    }

    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<Consultation>> getConsultationsByMedecin(@PathVariable Long medecinId) {
        return ResponseEntity.ok(consultationService.findByMedecinId(medecinId));
    }

    @PostMapping
    public ResponseEntity<Consultation> createConsultation(@RequestBody Consultation consultation) {
        return ResponseEntity.status(HttpStatus.CREATED).body(consultationService.save(consultation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable Long id,
                                                           @RequestBody Consultation consultation) {
        try {
            return ResponseEntity.ok(consultationService.update(id, consultation));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {
        if (consultationService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        consultationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
