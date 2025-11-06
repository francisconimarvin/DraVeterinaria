package com.draveterinaria.cl.scheduling.controller;



import com.draveterinaria.cl.scheduling.model.Tutor;
import com.draveterinaria.cl.scheduling.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutores")
@CrossOrigin(origins = "http://localhost:5173") // Ajusta al puerto de tu frontend
public class TutorController {

    @Autowired
    private TutorService tutorService;

    // 🔹 Obtener todos los tutores
    @GetMapping
    public ResponseEntity<List<Tutor>> getAllTutores() {
        return ResponseEntity.ok(tutorService.findAll());
    }

    // 🔹 Buscar tutor por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTutorById(@PathVariable int id) {
        try {
            Tutor tutor = tutorService.findById(id);
            return ResponseEntity.ok(tutor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 🔹 Buscar tutor por RUN
    @GetMapping("/run/{run}")
    public ResponseEntity<?> getTutorByRun(@PathVariable String run) {
        return tutorService.findByRun(run)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔹 Buscar tutor por correo
    @GetMapping("/correo/{correo}")
    public ResponseEntity<?> getTutorByCorreo(@PathVariable String correo) {
        return tutorService.findByCorreo(correo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔹 Crear o actualizar tutor
    @PostMapping
    public ResponseEntity<Tutor> saveTutor(@RequestBody Tutor tutor) {
        Tutor savedTutor = tutorService.save(tutor);
        return ResponseEntity.ok(savedTutor);
    }

    // 🔹 Eliminar tutor por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable int id) {
        try {
            tutorService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}