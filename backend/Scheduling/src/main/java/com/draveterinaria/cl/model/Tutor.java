package com.draveterinaria.cl.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;
import java.util.List;
import jakarta.validation.constraints.Email;


@Entity  // Marca esta clase como una entidad JPA.
@Table(name= "tutores")  // Especifica el nombre de la tabla en la base de datos.
@Data  // Genera automáticamente getters, setters, equals, hashCode y toString.
@NoArgsConstructor  // Genera un constructor sin argumentos.
@AllArgsConstructor  // Genera un constructor con un argumento por cada campo en la clase.
public class Tutor {

    @Id  // Especifica el identificador primario.
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // El valor del ID se generará automáticamente.
    private Integer id;

    @Column(unique=true, length = 13, nullable=false)  // Define las restricciones para la columna en la tabla.
    private String run;

    @Column(nullable=false)  // Esta columna no puede ser nula.
    private String nombres;

    @Column(nullable=false)  // Esta columna no puede ser nula.
    private String apellidos;

    @Column(nullable=true)  // Esta columna puede ser nula.
    private Date fechaNacimiento;

    // Esta columna no puede ser nula.
    @NotNull
    @Email
    @Column(unique = true, nullable = false)
    private String correo;


    @Column(unique=true, length = 9, nullable=false)  // Esta columna no puede ser nula.
    private String telefono;

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mascota> mascotas;
}