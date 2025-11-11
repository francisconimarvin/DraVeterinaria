package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.Servicio;
import com.draveterinaria.cl.scheduling.repository.MascotaRepository;
import com.draveterinaria.cl.scheduling.repository.ServicioRepository;
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

    // ✅ Crear o actualizar un servicio
    public Servicio save(Servicio servicio) {
        if (servicio.getMascota() == null || servicio.getMascota().getIdMascota() == null) {
            throw new RuntimeException("Debe asignar una mascota válida al servicio");
        }

        if (!mascotaRepository.existsById(servicio.getMascota().getIdMascota())) {
            throw new RuntimeException("Mascota no encontrada para el servicio");
        }

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
