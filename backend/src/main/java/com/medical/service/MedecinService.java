package com.medical.service;

import com.medical.entity.Medecin;
import com.medical.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    public List<Medecin> findAll() {
        return medecinRepository.findAll();
    }

    public Optional<Medecin> findById(Long id) {
        return medecinRepository.findById(id);
    }

    public Optional<Medecin> findByUserId(Long userId) {
        return medecinRepository.findByUser_Id(userId);
    }

    public Medecin save(Medecin medecin) {
        return medecinRepository.save(medecin);
    }

    public Medecin update(Long id, Medecin updatedMedecin) {
        return medecinRepository.findById(id).map(existing -> {
            existing.setNom(updatedMedecin.getNom());
            existing.setSpecialite(updatedMedecin.getSpecialite());
            if (updatedMedecin.getUser() != null) {
                existing.setUser(updatedMedecin.getUser());
            }
            return medecinRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Medecin not found with id: " + id));
    }

    public void deleteById(Long id) {
        medecinRepository.deleteById(id);
    }
}
