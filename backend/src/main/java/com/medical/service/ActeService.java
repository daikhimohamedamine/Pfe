package com.medical.service;

import com.medical.entity.Acte;
import com.medical.repository.ActeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ActeService {

    @Autowired
    private ActeRepository acteRepository;

    public List<Acte> findAll() {
        return acteRepository.findAll();
    }

    public Optional<Acte> findById(Long id) {
        return acteRepository.findById(id);
    }

    public List<Acte> findByEmployeId(Long employeId) {
        return acteRepository.findByEmploye_Id(employeId);
    }

    public Acte save(Acte acte) {
        return acteRepository.save(acte);
    }

    public Acte update(Long id, Acte updated) {
        return acteRepository.findById(id).map(existing -> {
            existing.setType(updated.getType());
            existing.setDate(updated.getDate());
            if (updated.getEmploye() != null) {
                existing.setEmploye(updated.getEmploye());
            }
            return acteRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Acte not found with id: " + id));
    }

    public void deleteById(Long id) {
        acteRepository.deleteById(id);
    }
}
