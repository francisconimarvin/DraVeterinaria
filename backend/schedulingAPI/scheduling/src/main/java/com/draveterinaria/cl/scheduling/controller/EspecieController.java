package com.draveterinaria.cl.scheduling.controller;


import com.draveterinaria.cl.scheduling.model.Especie;
import com.draveterinaria.cl.scheduling.model.TipoServicio;
import com.draveterinaria.cl.scheduling.service.EspecieService;
import com.draveterinaria.cl.scheduling.service.TipoServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/especies")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EspecieController {
    private final EspecieService especie;



    @GetMapping
    public ResponseEntity<List<Especie>> obtenerEspecies() {
        return ResponseEntity.ok(especie.listar());
    }
}
