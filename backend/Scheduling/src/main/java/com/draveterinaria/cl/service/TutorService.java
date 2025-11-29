package com.draveterinaria.cl.service;

import com.draveterinaria.cl.model.Tutor;
import com.draveterinaria.cl.repository.TutorRepository;
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

    public Optional<Tutor> findByRun(String run) {
        return tutorRepository.findByRun(run);
    }

    public Optional<Tutor> findByCorreo(String correo) {
        return tutorRepository.findByCorreo(correo);
    }

    public List<Tutor> findAll() {
        return tutorRepository.findAll();
    }

    public Tutor findById(int id) {
        return tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado con ID: " + id));
    }

    public Tutor save(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    public void deleteById(int id) {
        tutorRepository.deleteById(id);
    }

}
