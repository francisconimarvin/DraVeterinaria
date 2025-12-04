package com.draveterinaria.cl.scheduling.controller;

import com.draveterinaria.cl.scheduling.model.Especie;
import com.draveterinaria.cl.scheduling.service.EspecieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/especies")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Especies", description = "Operaciones relacionadas con especies de mascotas")
public class EspecieController {

    private final EspecieService especie;

    @GetMapping
    @Operation(
            summary = "Obtener todas las especies",
            description = "Retorna un listado de todas las especies registradas en el sistema"
    )
    public ResponseEntity<List<Especie>> obtenerEspecies() {
        return ResponseEntity.ok(especie.listar());
    }
}
