package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.TipoServicio;
import com.draveterinaria.cl.scheduling.service.TipoServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-servicio")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TipoServicioController {

    private final TipoServicioService service;

    @GetMapping
    public ResponseEntity<List<TipoServicio>> obtenerTipos() {
        return ResponseEntity.ok(service.listar());
    }
}
