package com.medical.repository;

import com.medical.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByEmploye_Id(Long employeId);
    List<Consultation> findByMedecin_Id(Long medecinId);
}
