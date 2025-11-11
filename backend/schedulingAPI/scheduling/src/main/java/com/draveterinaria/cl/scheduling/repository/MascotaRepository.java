package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    // Busca todas las mascotas de un tutor (relación tutor.idTutor)
    List<Mascota> findByTutorIdTutor(Long idTutor);

    // Búsqueda por nombre (insensible a mayúsculas)
    List<Mascota> findByNombreMascotaContainingIgnoreCase(String nombreMascota);
}

