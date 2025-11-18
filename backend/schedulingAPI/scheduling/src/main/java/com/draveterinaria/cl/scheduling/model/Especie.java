package com.draveterinaria.cl.scheduling.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ESPECIE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Especie {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_especie")
    @SequenceGenerator(name = "seq_especie", sequenceName = "SEQ_ESPECIE", allocationSize = 1)
    @Column(name = "ID_ESPECIE")
    private Long idEspecie;

    @Column(name = "NOMBRE_ESPECIE", nullable = false, length = 255)
    private String nombreEspecie;

}
