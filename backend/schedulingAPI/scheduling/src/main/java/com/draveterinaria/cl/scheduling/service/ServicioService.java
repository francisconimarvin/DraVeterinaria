package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.Mascota;
import com.draveterinaria.cl.scheduling.model.Servicio;
import com.draveterinaria.cl.scheduling.model.SubtipoServicio;
import com.draveterinaria.cl.scheduling.repository.MascotaRepository;
import com.draveterinaria.cl.scheduling.repository.ServicioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;


    public Servicio save(Servicio servicio) {

        // 1. VALIDACIÓN DEL OBJETO MASCOTA
        // Si el objeto Mascota es null O si el ID dentro del objeto Mascota es null
        if (servicio.getMascota() == null || servicio.getMascota().getIdMascota() == null) {
            throw new RuntimeException("Debe asignar una mascota válida al servicio");
        }

        // 2. VERIFICACIÓN DE EXISTENCIA
        // Usamos el método .getIdMascota() de la entidad Mascota
        if (!mascotaRepository.existsById(servicio.getMascota().getIdMascota())) {
            throw new RuntimeException("Mascota no encontrada para el servicio");
        }

        // 3. Guardado
        // Nota: Necesitas añadir una validación similar para SubtipoServicio
        return servicioRepository.save(servicio);
    }

    public List<Servicio> findAll() {
        return servicioRepository.findAll();
    }

    public Optional<Servicio> findById(Long id) {
        return servicioRepository.findById(id);
    }

    public List<Servicio> findByMascotaId(Long mascotaId) {
        return servicioRepository.findByMascotaIdMascota(mascotaId);
    }

    public List<Servicio> findByTutorId(Long tutorId) {
        return servicioRepository.findByTutorId(tutorId);
    }

    public List<Servicio> findByTutorAndFecha(Long tutorId, LocalDateTime fecha) {
        return servicioRepository.findByTutorAndFecha(tutorId, fecha);
    }

    public void deleteById(Long id) {
        servicioRepository.deleteById(id);
    }

    public void delete(Servicio servicio) {
        servicioRepository.delete(servicio);
    }
}
