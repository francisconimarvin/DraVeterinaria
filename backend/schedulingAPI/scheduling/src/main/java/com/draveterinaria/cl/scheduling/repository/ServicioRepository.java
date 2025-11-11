package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {

    // Buscar todos los servicios de una mascota
    List<Servicio> findByMascotaIdMascota(Long idMascota);

    // Buscar servicios por fecha exacta
    List<Servicio> findByFecha(LocalDateTime fecha);

    // 🔍 Buscar todos los servicios de un tutor (navegando desde mascota)
    @Query("SELECT s FROM Servicio s WHERE s.mascota.tutor.idTutor = :tutorId")
    List<Servicio> findByTutorId(@Param("tutorId") Long tutorId);

    // 🔍 Buscar servicios de un tutor en una fecha específica
    @Query("SELECT s FROM Servicio s WHERE s.mascota.tutor.idTutor = :tutorId AND s.fecha = :fecha")
    List<Servicio> findByTutorAndFecha(@Param("tutorId") Long tutorId, @Param("fecha") LocalDateTime fecha);
}
