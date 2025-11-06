package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Integer> {

    List<Mascota> findByTutorId(Integer tutorId);  // todas las mascotas de un tutor
    List<Mascota> findByNombreContainingIgnoreCase(String nombre);  // búsqueda por nombre
}

