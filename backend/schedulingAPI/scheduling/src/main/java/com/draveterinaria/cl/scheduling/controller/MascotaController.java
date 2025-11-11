package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.Mascota;
import com.draveterinaria.cl.scheduling.service.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "*")
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    @GetMapping
    public ResponseEntity<List<Mascota>> getAllMascotas() {
        return ResponseEntity.ok(mascotaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mascota> getMascotaById(@PathVariable Long id) {
        return mascotaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Mascota>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(mascotaService.findByNombre(nombre));
    }

    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<Mascota>> getByTutorId(@PathVariable Long tutorId) {
        return ResponseEntity.ok(mascotaService.findByTutorId(tutorId));
    }

    @PostMapping
    public ResponseEntity<Mascota> createMascota(@RequestBody Mascota mascota) {
        return ResponseEntity.ok(mascotaService.save(mascota));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mascota> updateMascota(@PathVariable Long id, @RequestBody Mascota mascota) {
        mascota.setIdMascota(id);
        return ResponseEntity.ok(mascotaService.save(mascota));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMascota(@PathVariable Long id) {
        mascotaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
