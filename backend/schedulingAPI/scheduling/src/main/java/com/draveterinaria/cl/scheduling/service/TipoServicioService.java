package com.draveterinaria.cl.scheduling.service;


import com.draveterinaria.cl.scheduling.model.TipoServicio;

import com.draveterinaria.cl.scheduling.repository.TipoServicioRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TipoServicioService {

    private final TipoServicioRepository repository;

    public List<TipoServicio> listar() {
        return repository.findAll();
    }
}

