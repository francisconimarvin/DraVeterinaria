package com.draveterinaria.cl.scheduling.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "TIPO_SERVICIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_serv_seq")
    @SequenceGenerator(name = "tipo_serv_seq", sequenceName = "seq_tiposervicio", allocationSize = 1)
    @Column(name = "ID_TIPO_SERVICIO")
    private Long idTipo;

    @Column(name = "TIPO_SERVICIO", length = 100, nullable = false)
    private String tipoServicio;

    @OneToMany(mappedBy = "tipoServicio", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<SubtipoServicio> subtipos;
}
