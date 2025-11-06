package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Integer> {

    // Buscar todos los servicios de una mascota
    List<Servicio> findByMascotaId(Integer mascotaId);

    // Buscar servicios por fecha
    List<Servicio> findByFechaServicio(java.time.LocalDate fechaServicio);

    // Buscar servicios por tipo (vacuna, baño, control, etc.)
    List<Servicio> findByTipoServicioIgnoreCase(String tipo);

    // 🔍 Buscar todos los servicios de un tutor (JPQL)
    @Query("SELECT s FROM Servicio s WHERE s.mascota.tutor.id = :tutorId")
    List<Servicio> findByTutorId(@Param("tutorId") Integer tutorId);

    // 🔍 Buscar servicios de un tutor en una fecha específica (JPQL)
    @Query("SELECT s FROM Servicio s WHERE s.mascota.tutor.id = :tutorId AND s.fechaServicio = :fecha")
    List<Servicio> findByTutorAndFecha(@Param("tutorId") Integer tutorId, @Param("fecha") java.time.LocalDate fecha);
}

