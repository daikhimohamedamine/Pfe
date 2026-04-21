package com.medical.service;

import com.medical.entity.Examen;
import com.medical.repository.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExamenService {

    @Autowired
    private ExamenRepository examenRepository;

    public List<Examen> findAll() {
        return examenRepository.findAll();
    }

    public Optional<Examen> findById(Long id) {
        return examenRepository.findById(id);
    }

    public List<Examen> findByEmployeId(Long employeId) {
        return examenRepository.findByEmploye_Id(employeId);
    }

    public Examen save(Examen examen) {
        return examenRepository.save(examen);
    }

    public Examen update(Long id, Examen updated) {
        return examenRepository.findById(id).map(existing -> {
            existing.setTypeExamens(updated.getTypeExamens());
            existing.setResultats(updated.getResultats());
            if (updated.getEmploye() != null) {
                existing.setEmploye(updated.getEmploye());
            }
            if (updated.getConsultation() != null) {
                existing.setConsultation(updated.getConsultation());
            }
            return examenRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Examen not found with id: " + id));
    }

    public void deleteById(Long id) {
        examenRepository.deleteById(id);
    }
}
