package com.medical.repository;

import com.medical.entity.Rappel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RappelRepository extends JpaRepository<Rappel, Long> {
    List<Rappel> findByEmploye_Id(Long employeId);
    List<Rappel> findByStatus(String status);
    long countByStatus(String status);
}
