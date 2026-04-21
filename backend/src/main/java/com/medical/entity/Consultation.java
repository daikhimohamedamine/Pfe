package com.medical.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "consultations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String type;

    private String motif;

    @Column(columnDefinition = "TEXT")
    private String observations;

    @Column(columnDefinition = "TEXT")
    private String examen;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employe_id")
    private Employe employe;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medecin_id")
    private Medecin medecin;
}
