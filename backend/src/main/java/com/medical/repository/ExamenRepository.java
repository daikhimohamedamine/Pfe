package com.medical.repository;

import com.medical.entity.Examen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {
    List<Examen> findByEmploye_Id(Long employeId);
}
