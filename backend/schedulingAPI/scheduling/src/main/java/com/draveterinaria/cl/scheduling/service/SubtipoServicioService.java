package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.SubtipoServicio;
import com.draveterinaria.cl.scheduling.model.TipoServicio;
import com.draveterinaria.cl.scheduling.repository.SubtipoServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubtipoServicioService {

    private final SubtipoServicioRepository repository;

    public List<SubtipoServicio> listar() {
        return repository.findAll();
    }

    public List<SubtipoServicio> buscarPorTipo(Long idTipo) {
        // Llama al nuevo método del Repository
        return repository.findByTipoServicio_IdTipo(idTipo);
    }
}
