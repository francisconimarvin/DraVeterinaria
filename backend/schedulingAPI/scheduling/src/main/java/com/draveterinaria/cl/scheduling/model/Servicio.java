package com.draveterinaria.cl.scheduling.model;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "SERVICIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "service_seq")
    @SequenceGenerator(name = "service_seq", sequenceName = "seq_servicio", allocationSize = 1)
    @Column(name = "ID_SERVICIO")
    private Long idServicio;

    // Relación con MASCOTA
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_MASCOTA", nullable = false)
    private Mascota mascota;


    @Column(name = "FECHA")
    private LocalDateTime fecha;

    @Column(name = "COSTO", precision = 10, scale = 2, nullable = false)
    private BigDecimal costo;

    @Column(name = "ID_AGENDA")
    private Long idAgenda;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_SUBTIPO", nullable = false) // Usa el nombre de columna que creaste en SQL
    private SubtipoServicio subtipo;

    @Column(name = "ID_FACTURA")
    private Long idFactura;

    @Column(name = "ESTADO_PAGO", length = 20)
    private String estadoPago = "PENDIENTE";
}


