package com.medical.controller;

import com.medical.entity.Employe;
import com.medical.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    @GetMapping
    public ResponseEntity<List<Employe>> getAllEmployes() {
        return ResponseEntity.ok(employeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employe> getEmployeById(@PathVariable Long id) {
        return employeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Employe> getEmployeByUserId(@PathVariable Long userId) {
        return employeService.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Employe> createEmploye(@RequestBody Employe employe) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeService.save(employe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employe> updateEmploye(@PathVariable Long id, @RequestBody Employe employe) {
        try {
            return ResponseEntity.ok(employeService.update(id, employe));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmploye(@PathVariable Long id) {
        if (employeService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        employeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
