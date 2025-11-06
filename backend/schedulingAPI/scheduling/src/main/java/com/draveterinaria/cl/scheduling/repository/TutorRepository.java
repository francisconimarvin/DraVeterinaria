package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer> {
    // Buscar por correo o RUN (para identificar al dueño)
    Optional<Tutor> findByCorreo(String correo);
    Optional<Tutor> findByRun(String run);
}