package com.draveterinaria.cl.scheduling.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "SUBTIPO_SERVICIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubtipoServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subtipo_seq")
    @SequenceGenerator(name = "subtipo_seq", sequenceName = "SUBTIPO_SEQ", allocationSize = 1)
    private Long idSubtipo;

    @Column(name = "NOMBRE_SUBTIPO")
    private String nombreSubtipo;

    @Column(name = "PRECIO")
    private Double precio;

    @ManyToOne
    @JoinColumn(name = "ID_TIPO_SERVICIO", nullable = false)
    @JsonBackReference
    private TipoServicio tipoServicio;
}
