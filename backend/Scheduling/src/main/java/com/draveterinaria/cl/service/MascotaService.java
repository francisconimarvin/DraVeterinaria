package com.draveterinaria.cl.service;

import com.draveterinaria.cl.model.Mascota;
import com.draveterinaria.cl.repository.MascotaRepository;
import com.draveterinaria.cl.repository.TutorRepository;
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
        // Valida que el tutor exista antes de guardar
        if (mascota.getTutor() == null ||
                !tutorRepository.existsById(mascota.getTutor().getId())) {
            throw new RuntimeException("Tutor no encontrado para la mascota");
        }
        return mascotaRepository.save(mascota);
    }

    public List<Mascota> findAll() {
        return mascotaRepository.findAll();
    }

    public Optional<Mascota> findById(Integer id) {
        return mascotaRepository.findById(id);
    }

    public List<Mascota> findByNombre(String nombre) {
        return mascotaRepository.findByNombreContainingIgnoreCase(nombre);
    }


    public List<Mascota> findByTutorId(Integer tutorId) {
        return mascotaRepository.findByTutorId(tutorId);
    }


    public void deleteById(Integer id) {
        mascotaRepository.deleteById(id);
    }


    public void delete(Mascota mascota) {
        mascotaRepository.delete(mascota);
    }
}