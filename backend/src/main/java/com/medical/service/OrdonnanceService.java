package com.medical.service;

import com.medical.entity.Ordonnance;
import com.medical.repository.OrdonnanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrdonnanceService {

    @Autowired
    private OrdonnanceRepository ordonnanceRepository;

    public List<Ordonnance> findAll() {
        return ordonnanceRepository.findAll();
    }

    public Optional<Ordonnance> findById(Long id) {
        return ordonnanceRepository.findById(id);
    }

    public List<Ordonnance> findByConsultationId(Long consultationId) {
        return ordonnanceRepository.findByConsultation_Id(consultationId);
    }

    public Ordonnance save(Ordonnance ordonnance) {
        return ordonnanceRepository.save(ordonnance);
    }

    public Ordonnance update(Long id, Ordonnance updated) {
        return ordonnanceRepository.findById(id).map(existing -> {
            existing.setType(updated.getType());
            existing.setDate(updated.getDate());
            existing.setMedicaments(updated.getMedicaments());
            if (updated.getConsultation() != null) {
                existing.setConsultation(updated.getConsultation());
            }
            return ordonnanceRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Ordonnance not found with id: " + id));
    }

    public void deleteById(Long id) {
        ordonnanceRepository.deleteById(id);
    }
}
