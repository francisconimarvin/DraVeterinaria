package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.Mascota;
import com.draveterinaria.cl.scheduling.model.Servicio;
import com.draveterinaria.cl.scheduling.repository.MascotaRepository;
import com.draveterinaria.cl.scheduling.repository.ServicioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        // Validar que la mascota exista antes de agendar el servicio
        if (servicio.getMascota() == null ||
                !mascotaRepository.existsById(servicio.getMascota().getId())) {
            throw new RuntimeException("Mascota no encontrada para el servicio");
        }
        return servicioRepository.save(servicio);
    }

    // ✅ Obtener todos los servicios
    public List<Servicio> findAll() {
        return servicioRepository.findAll();
    }

    // ✅ Buscar un servicio por ID
    public Optional<Servicio> findById(Integer id) {
        return servicioRepository.findById(id);
    }

    // ✅ Buscar servicios por mascota
    public List<Servicio> findByMascotaId(Integer mascotaId) {
        return servicioRepository.findByMascotaId(mascotaId);
    }

    // ✅ Buscar servicios por tutor
    public List<Servicio> findByTutorId(Integer tutorId) {
        return servicioRepository.findByTutorId(tutorId);
    }

    // ✅ Buscar servicios por tipo (baño, vacuna, etc.)
    public List<Servicio> findByTipoServicio(String tipo) {
        return servicioRepository.findByTipoServicioIgnoreCase(tipo);
    }

    // ✅ Buscar servicios de un tutor en una fecha específica
    public List<Servicio> findByTutorAndFecha(Integer tutorId, LocalDate fecha) {
        return servicioRepository.findByTutorAndFecha(tutorId, fecha);
    }

    // ✅ Eliminar servicio por ID
    public void deleteById(Integer id) {
        servicioRepository.deleteById(id);
    }

    // ✅ Eliminar por objeto
    public void delete(Servicio servicio) {
        servicioRepository.delete(servicio);
    }
}

