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
    @SequenceGenerator(name = "service_seq", sequenceName = "ISEQ$$_107406", allocationSize = 1)
    @Column(name = "ID_SERVICIO")
    private Long idServicio;

    // Relación con MASCOTA
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_MASCOTA", nullable = false)
    private Mascota mascota;

    @Column(name = "DURACION")
    private String duracion; // Oracle INTERVAL no tiene tipo directo en Java, puedes mapearlo como String

    @Column(name = "FECHA")
    private LocalDateTime fecha;

    @Column(name = "COSTO", precision = 10, scale = 2, nullable = false)
    private BigDecimal costo;

    @Column(name = "ID_AGENDA")
    private Long idAgenda;

    @Column(name = "ID_TIPO_SERVICIO", nullable = false)
    private Long idTipoServicio;

    @Column(name = "ID_FACTURA")
    private Long idFactura;

    @Column(name = "ESTADO_PAGO", length = 20)
    private String estadoPago = "PENDIENTE";
}


