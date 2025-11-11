package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {

    // Buscar por email o RUN
    Optional<Tutor> findByEmail(String email);
    Optional<Tutor> findByRunTutor(String runTutor);
}
