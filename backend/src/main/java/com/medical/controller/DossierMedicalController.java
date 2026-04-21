package com.medical.controller;

import com.medical.entity.DossierMedical;
import com.medical.service.DossierMedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dossiers")
@CrossOrigin(origins = "http://localhost:4200")
public class DossierMedicalController {

    @Autowired
    private DossierMedicalService dossierMedicalService;

    @GetMapping
    public ResponseEntity<List<DossierMedical>> getAllDossiers() {
        return ResponseEntity.ok(dossierMedicalService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DossierMedical> getDossierById(@PathVariable Long id) {
        return dossierMedicalService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<DossierMedical> getDossierByEmploye(@PathVariable Long employeId) {
        return dossierMedicalService.findByEmployeId(employeId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DossierMedical> createDossier(@RequestBody DossierMedical dossier) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dossierMedicalService.save(dossier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DossierMedical> updateDossier(@PathVariable Long id,
                                                        @RequestBody DossierMedical dossier) {
        try {
            return ResponseEntity.ok(dossierMedicalService.update(id, dossier));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDossier(@PathVariable Long id) {
        if (dossierMedicalService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        dossierMedicalService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
