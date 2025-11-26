package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.SubtipoServicio;
import com.draveterinaria.cl.scheduling.service.SubtipoServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subtipos-servicio")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SubtipoServicioController {

    private final SubtipoServicioService service;

    @GetMapping
    public ResponseEntity<List<SubtipoServicio>> obtenerSubtipos() {
        return ResponseEntity.ok(service.listar());
    }
    @GetMapping("/tipo/{idTipo}")
    public ResponseEntity<List<SubtipoServicio>> obtenerSubtiposPorTipo(@PathVariable Long idTipo) {
        List<SubtipoServicio> subtipos = service.buscarPorTipo(idTipo);

        if (subtipos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(subtipos);
    }
}
