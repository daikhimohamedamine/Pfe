package com.medical.controller;

import com.medical.repository.*;
import com.medical.service.RappelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private RappelRepository rappelRepository;

    @Autowired
    private RappelService rappelService;

    @Autowired
    private MedecinRepository medecinRepository;

    @Autowired
    private ExamenRepository examenRepository;

    @Autowired
    private OrdonnanceRepository ordonnanceRepository;

    @Autowired
    private ActeRepository acteRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalPatients", employeRepository.count());
        stats.put("totalConsultations", consultationRepository.count());
        stats.put("totalMedecins", medecinRepository.count());
        stats.put("totalExamens", examenRepository.count());
        stats.put("totalOrdonnances", ordonnanceRepository.count());
        stats.put("totalActes", acteRepository.count());
        stats.put("rappelsPending", rappelService.countPending());
        stats.put("rappelsTotal", rappelRepository.count());

        return ResponseEntity.ok(stats);
    }
}
