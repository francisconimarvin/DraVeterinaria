package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.Tutor;
import com.draveterinaria.cl.scheduling.repository.TutorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    public Optional<Tutor> findByRunTutor(String runTutor) {
        return tutorRepository.findByRunTutor(runTutor);
    }

    public Optional<Tutor> findByEmail(String email) {
        return tutorRepository.findByEmail(email);
    }

    public List<Tutor> findAll() {
        return tutorRepository.findAll();
    }

    public Tutor findById(Long id) {
        return tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado con ID: " + id));
    }

    public Tutor save(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    public void deleteById(Long id) {
        tutorRepository.deleteById(id);
    }
}

