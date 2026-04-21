package com.medical.repository;

import com.medical.entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, Long> {
    Optional<Medecin> findByUser_Id(Long userId);
}
