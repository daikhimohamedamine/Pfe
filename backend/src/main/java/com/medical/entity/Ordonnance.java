package com.medical.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "ordonnances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String medicaments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "consultation_id")
    private Consultation consultation;
}
