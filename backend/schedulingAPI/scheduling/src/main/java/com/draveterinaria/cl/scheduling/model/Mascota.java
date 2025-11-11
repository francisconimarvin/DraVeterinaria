package com.draveterinaria.cl.scheduling.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "MASCOTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mascota_seq")
    @SequenceGenerator(name = "mascota_seq", sequenceName = "ID_MASC_SEQ", allocationSize = 1)
    @Column(name = "ID_MASCOTA")
    private Long idMascota;

    @Column(name = "NOMBRE_MASCOTA", nullable = false, length = 255)
    private String nombreMascota;

    @Column(name = "FECHA_NACIMIENTO")
    private LocalDate fechaNacimiento;

    @Column(name = "SEXO", nullable = false, length = 1)
    private String sexo;

    @Column(name = "ID_ESPECIE", nullable = false)
    private Long idEspecie;

    // Relación con TUTOR
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_TUTOR", nullable = false)
    private Tutor tutor;
}

