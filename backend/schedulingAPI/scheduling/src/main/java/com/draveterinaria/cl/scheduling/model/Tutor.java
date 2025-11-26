package com.draveterinaria.cl.scheduling.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.Email;


@Entity
@Table(name = "TUTOR")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tutor_seq")
    @SequenceGenerator(name = "tutor_seq", sequenceName = "ID_TUTOR_SEQ", allocationSize = 1)
    @Column(name = "ID_TUTOR")
    private Long idTutor;

    @Column(name = "RUN_TUTOR", length = 8)
    private String runTutor;

    @Column(name = "DV_RUN", length = 1)
    private String dvRun;

    @Column(name = "NOMBRE_TUTOR", length = 20)
    private String nombreTutor;

    @Column(name = "SNOMBRE_TUTOR", length = 20)
    private String sNombreTutor;

    @Column(name = "APPATERNO_TUTOR", length = 20)
    private String apPaternoTutor;

    @Column(name = "AMATERNO_TUTOR", length = 20)
    private String aMaternoTutor;

    @Column(name = "TLF", length = 14)
    private String telefono;

    @Column(name = "DIRECCION", length = 50)
    private String direccion;

    @Column(name = "EMAIL", length = 50)
    private String email;


    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Mascota> mascotas;
}