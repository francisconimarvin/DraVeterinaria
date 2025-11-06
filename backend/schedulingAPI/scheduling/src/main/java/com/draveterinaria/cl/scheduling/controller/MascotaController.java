package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.Mascota;
import com.draveterinaria.cl.scheduling.service.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "http://localhost:5173") // Ajusta el puerto de tu frontend
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;


    @GetMapping
    public ResponseEntity<List<Mascota>> getAllMascotas() {
        return ResponseEntity.ok(mascotaService.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getMascotaById(@PathVariable Integer id) {
        return mascotaService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<Mascota>> getMascotaByNombre(@PathVariable String nombre) {
        List<Mascota> mascotas = mascotaService.findByNombre(nombre);
        return mascotas.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(mascotas);
    }


    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<Mascota>> getMascotasByTutor(@PathVariable Integer tutorId) {
        List<Mascota> mascotas = mascotaService.findByTutorId(tutorId);
        return mascotas.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(mascotas);
    }

    @PostMapping
    public ResponseEntity<?> saveMascota(@RequestBody Mascota mascota) {
        try {
            Mascota saved = mascotaService.save(mascota);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMascota(@PathVariable Integer id) {
        if (mascotaService.findById(id).isPresent()) {
            mascotaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}