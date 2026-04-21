package com.medical.service;

import com.medical.entity.Employe;
import com.medical.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    public List<Employe> findAll() {
        return employeRepository.findAll();
    }

    public Optional<Employe> findById(Long id) {
        return employeRepository.findById(id);
    }

    public Optional<Employe> findByUserId(Long userId) {
        return employeRepository.findByUser_Id(userId);
    }

    public Employe save(Employe employe) {
        return employeRepository.save(employe);
    }

    public Employe update(Long id, Employe updatedEmploye) {
        return employeRepository.findById(id).map(existing -> {
            existing.setNom(updatedEmploye.getNom());
            existing.setPrenom(updatedEmploye.getPrenom());
            existing.setDateNaissance(updatedEmploye.getDateNaissance());
            existing.setPosteTravail(updatedEmploye.getPosteTravail());
            existing.setDateEmbauche(updatedEmploye.getDateEmbauche());
            existing.setVaccination(updatedEmploye.getVaccination());
            if (updatedEmploye.getUser() != null) {
                existing.setUser(updatedEmploye.getUser());
            }
            return employeRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Employe not found with id: " + id));
    }

    public void deleteById(Long id) {
        employeRepository.deleteById(id);
    }
}
