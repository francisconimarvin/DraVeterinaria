package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.Mascota;
import com.draveterinaria.cl.scheduling.model.Servicio;
import com.draveterinaria.cl.scheduling.model.SubtipoServicio;
import com.draveterinaria.cl.scheduling.repository.MascotaRepository;
import com.draveterinaria.cl.scheduling.repository.ServicioRepository;
import com.draveterinaria.cl.scheduling.repository.SubtipoServicioRepository;
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
    private SubtipoServicioRepository subtipoServicioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;


    public Servicio save(Servicio servicio) {
        if (servicio.getMascota() == null || servicio.getMascota().getIdMascota() == null) {
            throw new RuntimeException("Debe asignar una mascota válida al servicio");
        }

        Mascota mascotaReal = mascotaRepository.findById(servicio.getMascota().getIdMascota())
                .orElseThrow(() -> new RuntimeException(
                        "Mascota no encontrada con ID " + servicio.getMascota().getIdMascota()
                ));
        servicio.setMascota(mascotaReal);


        if (servicio.getSubtipo() == null || servicio.getSubtipo().getIdSubtipo() == null) {
            throw new RuntimeException("Debe asignar un subtipo válido al servicio");
        }


        SubtipoServicio subtipoReal = subtipoServicioRepository.findById(servicio.getSubtipo().getIdSubtipo())
                .orElseThrow(() -> new RuntimeException(
                        "Subtipo de servicio no encontrado con ID " + servicio.getSubtipo().getIdSubtipo()
                ));

        servicio.setSubtipo(subtipoReal);


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
