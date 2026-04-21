package com.medical.service;

import com.medical.entity.Rappel;
import com.medical.repository.RappelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RappelService {

    @Autowired
    private RappelRepository rappelRepository;

    public List<Rappel> findAll() {
        return rappelRepository.findAll();
    }

    public Optional<Rappel> findById(Long id) {
        return rappelRepository.findById(id);
    }

    public List<Rappel> findByEmployeId(Long employeId) {
        return rappelRepository.findByEmploye_Id(employeId);
    }

    public List<Rappel> findByStatus(String status) {
        return rappelRepository.findByStatus(status);
    }

    public Rappel save(Rappel rappel) {
        return rappelRepository.save(rappel);
    }

    public Rappel update(Long id, Rappel updated) {
        return rappelRepository.findById(id).map(existing -> {
            existing.setType(updated.getType());
            existing.setDate(updated.getDate());
            existing.setStatus(updated.getStatus());
            if (updated.getEmploye() != null) {
                existing.setEmploye(updated.getEmploye());
            }
            return rappelRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Rappel not found with id: " + id));
    }

    public void deleteById(Long id) {
        rappelRepository.deleteById(id);
    }

    public long countPending() {
        return rappelRepository.countByStatus("PENDING");
    }
}
