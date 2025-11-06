package com.draveterinaria.cl.scheduling.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity  // Marca esta clase como una entidad JPA.
@Table(name= "servicios")  // Especifica el nombre de la tabla en la base de datos.
@Data  // Genera automáticamente getters, setters, equals, hashCode y toString.
@NoArgsConstructor  // Genera un constructor sin argumentos.
@AllArgsConstructor  // Genera un constructor con un argumento por cada campo en la clase.
public class Servicio {
    @Id  // Especifica el identificador primario.
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // El valor del ID se generará automáticamente.
    private Integer id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = true)  // Define las restricciones para la columna en la tabla.
    private LocalDate fechaServicio;

    @JsonFormat(pattern = "HH:mm:ss")
    @Column(nullable=true)  // Esta columna puede ser nula.
    private LocalTime horaServicio;

    @Column(length = 255,nullable=false)  // Esta columna no puede ser nula.
    private String nombreServicio;


    @Column(length = 255,nullable=false)  // Esta columna no puede ser nula.
    private String tipoServicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_mascota", nullable = false, foreignKey = @ForeignKey(name = "fk_ate_pac"))
    @JsonBackReference
    private Mascota mascota;
}


