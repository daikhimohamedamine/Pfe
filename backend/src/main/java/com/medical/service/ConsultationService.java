package com.medical.service;

import com.medical.entity.Consultation;
import com.medical.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;

    public List<Consultation> findAll() {
        return consultationRepository.findAll();
    }

    public Optional<Consultation> findById(Long id) {
        return consultationRepository.findById(id);
    }

    public List<Consultation> findByEmployeId(Long employeId) {
        return consultationRepository.findByEmploye_Id(employeId);
    }

    public List<Consultation> findByMedecinId(Long medecinId) {
        return consultationRepository.findByMedecin_Id(medecinId);
    }

    public Consultation save(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public Consultation update(Long id, Consultation updated) {
        return consultationRepository.findById(id).map(existing -> {
            existing.setDate(updated.getDate());
            existing.setType(updated.getType());
            existing.setMotif(updated.getMotif());
            existing.setObservations(updated.getObservations());
            existing.setExamen(updated.getExamen());
            if (updated.getEmploye() != null) {
                existing.setEmploye(updated.getEmploye());
            }
            if (updated.getMedecin() != null) {
                existing.setMedecin(updated.getMedecin());
            }
            return consultationRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Consultation not found with id: " + id));
    }

    public void deleteById(Long id) {
        consultationRepository.deleteById(id);
    }
}
