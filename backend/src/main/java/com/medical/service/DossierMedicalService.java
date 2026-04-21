package com.medical.service;

import com.medical.entity.DossierMedical;
import com.medical.repository.DossierMedicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DossierMedicalService {

    @Autowired
    private DossierMedicalRepository dossierMedicalRepository;

    public List<DossierMedical> findAll() {
        return dossierMedicalRepository.findAll();
    }

    public Optional<DossierMedical> findById(Long id) {
        return dossierMedicalRepository.findById(id);
    }

    public Optional<DossierMedical> findByEmployeId(Long employeId) {
        return dossierMedicalRepository.findByEmploye_Id(employeId);
    }

    public DossierMedical save(DossierMedical dossier) {
        return dossierMedicalRepository.save(dossier);
    }

    public DossierMedical update(Long id, DossierMedical updated) {
        return dossierMedicalRepository.findById(id).map(existing -> {
            existing.setHistorique(updated.getHistorique());
            existing.setAntecedents(updated.getAntecedents());
            existing.setTraitements(updated.getTraitements());
            existing.setAllergies(updated.getAllergies());
            if (updated.getEmploye() != null) {
                existing.setEmploye(updated.getEmploye());
            }
            return dossierMedicalRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("DossierMedical not found with id: " + id));
    }

    public void deleteById(Long id) {
        dossierMedicalRepository.deleteById(id);
    }
}
