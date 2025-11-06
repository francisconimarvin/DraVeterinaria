package com.draveterinaria.cl.scheduling.controller;


import com.draveterinaria.cl.scheduling.model.Servicio;
import com.draveterinaria.cl.scheduling.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/servicios")
@CrossOrigin(origins = "http://localhost:5173") // para aceptar los request del frontend
public class ServicioController {

    private final ServicioService servicioService;

    @Autowired
    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping
    public List<Servicio> getAllServicios() {
        return servicioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> getServicioById(@PathVariable Integer id) {
        return servicioService.findById(id)
                .map(ResponseEntity::ok) // si lo encuentra, devuelve 200 OK con el objeto
                .orElseGet(() -> ResponseEntity.notFound().build()); // si no existe, devuelve 404
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Servicio createServicio(@RequestBody Servicio servicio) {
        return servicioService.save(servicio);
    }

    @PutMapping("/{id}")
    public Servicio updateServicio(@PathVariable Integer id, @RequestBody Servicio servicio) {
        servicio.setId(id);
        return servicioService.save(servicio);
    }

    @DeleteMapping("/{id}")
    public void deleteServicio(@PathVariable Integer id) {
        servicioService.deleteById(id);
    }

    // ✅ Buscar servicios de un tutor en una fecha específica
    @GetMapping("/tutor/{tutorId}/fecha/{fecha}")
    public List<Servicio> getServiciosByTutorAndFecha(
            @PathVariable Integer tutorId,
            @PathVariable String fecha) {
        LocalDate localDate = LocalDate.parse(fecha);
        return servicioService.findByTutorAndFecha(tutorId, localDate);
    }
}

