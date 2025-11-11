package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.Tutor;
import com.draveterinaria.cl.scheduling.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutores")
@CrossOrigin(origins = "*")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping
    public ResponseEntity<List<Tutor>> getAllTutores() {
        return ResponseEntity.ok(tutorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> getTutorById(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.findById(id));
    }

    @GetMapping("/run/{runTutor}")
    public ResponseEntity<Tutor> getTutorByRun(@PathVariable String runTutor) {
        return tutorService.findByRunTutor(runTutor)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email")
    public ResponseEntity<Tutor> getTutorByEmail(@RequestParam String email) {
        return tutorService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tutor> createTutor(@RequestBody Tutor tutor) {
        return ResponseEntity.ok(tutorService.save(tutor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutor> updateTutor(@PathVariable Long id, @RequestBody Tutor tutor) {
        tutor.setIdTutor(id);
        return ResponseEntity.ok(tutorService.save(tutor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable Long id) {
        tutorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
