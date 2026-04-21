package com.medical.repository;

import com.medical.entity.Acte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActeRepository extends JpaRepository<Acte, Long> {
    List<Acte> findByEmploye_Id(Long employeId);
}
