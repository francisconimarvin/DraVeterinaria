package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.Servicio;
import com.draveterinaria.cl.scheduling.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "*")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<Servicio>> getAllServicios() {
        return ResponseEntity.ok(servicioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> getServicioById(@PathVariable Long id) {
        return servicioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mascota/{mascotaId}")
    public ResponseEntity<List<Servicio>> getByMascotaId(@PathVariable Long mascotaId) {
        return ResponseEntity.ok(servicioService.findByMascotaId(mascotaId));
    }

    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<Servicio>> getByTutorId(@PathVariable Long tutorId) {
        return ResponseEntity.ok(servicioService.findByTutorId(tutorId));
    }

    @GetMapping("/tutor/{tutorId}/fecha")
    public ResponseEntity<List<Servicio>> getByTutorAndFecha(
            @PathVariable Long tutorId,
            @RequestParam String fecha) {
        LocalDateTime fechaParseada = LocalDateTime.parse(fecha);
        return ResponseEntity.ok(servicioService.findByTutorAndFecha(tutorId, fechaParseada));
    }

    // Suponiendo que este es el método en su ServicioController.java
    @PostMapping("/servicios") // Ajuste la URL si es necesario
    public ResponseEntity<?> createServicio(@RequestBody Servicio servicio) {
        try {
            // El @RequestBody mapea directamente el JSON anterior al objeto Servicio
            Servicio nuevoServicio = servicioService.save(servicio);
            return new ResponseEntity<>(nuevoServicio, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Captura las RuntimeException lanzadas en el Service
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al guardar.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> updateServicio(@PathVariable Long id, @RequestBody Servicio servicio) {
        servicio.setIdServicio(id);
        return ResponseEntity.ok(servicioService.save(servicio));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServicio(@PathVariable Long id) {
        servicioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
