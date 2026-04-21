package com.medical.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "rappels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rappel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private LocalDate date;

    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employe_id")
    private Employe employe;
}
