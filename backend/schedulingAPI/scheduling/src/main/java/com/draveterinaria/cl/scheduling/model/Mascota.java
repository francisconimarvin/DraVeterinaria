package com.draveterinaria.cl.scheduling.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Entity  // Marca esta clase como una entidad JPA.
@Table(name= "mascotas")  // Especifica el nombre de la tabla en la base de datos.
@Data  // Genera automáticamente getters, setters, equals, hashCode y toString.
@NoArgsConstructor  // Genera un constructor sin argumentos.
@AllArgsConstructor  // Genera un constructor con un argumento por cada campo en la clase.
public class Mascota {
    @Id  // Especifica el identificador primario.
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // El valor del ID se generará automáticamente.
    private Integer id;

    @Column(nullable = true)  // Define las restricciones para la columna en la tabla.
    private String nombre;

    @Column(nullable = true)  // Esta columna puede ser nula.
    private Integer edad;

    @Column(length = 255, nullable = false)  // Esta columna no puede ser nula.
    private String especie;

    @Column(length = 255, nullable = false)  // Esta columna no puede ser nula.
    private String raza;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tutor", nullable = false, foreignKey = @ForeignKey(name = "fk_masc_tut"))
    @JsonBackReference
    private Tutor tutor;

    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Servicio> servicios;
}

