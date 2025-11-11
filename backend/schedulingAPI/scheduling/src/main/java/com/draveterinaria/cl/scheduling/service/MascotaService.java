package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.Mascota;
import com.draveterinaria.cl.scheduling.repository.MascotaRepository;
import com.draveterinaria.cl.scheduling.repository.TutorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public Mascota save(Mascota mascota) {
        if (mascota.getTutor() != null && mascota.getTutor().getIdTutor() != null) {
            return tutorRepository.findById(mascota.getTutor().getIdTutor())
                    .map(tutor -> {
                        mascota.setTutor(tutor);
                        return mascotaRepository.save(mascota);
                    })
                    .orElseThrow(() -> new RuntimeException("Tutor no encontrado para la mascota"));
        } else {
            throw new RuntimeException("Debe asignar un tutor existente a la mascota");
        }
    }

    public List<Mascota> findAll() {
        return mascotaRepository.findAll();
    }

    public Optional<Mascota> findById(Long id) {
        return mascotaRepository.findById(id);
    }

    public List<Mascota> findByNombre(String nombre) {
        return mascotaRepository.findByNombreMascotaContainingIgnoreCase(nombre);
    }

    public List<Mascota> findByTutorId(Long tutorId) {
        return mascotaRepository.findByTutorIdTutor(tutorId);
    }

    public void deleteById(Long id) {
        mascotaRepository.deleteById(id);
    }

    public void delete(Mascota mascota) {
        mascotaRepository.delete(mascota);
    }
}
