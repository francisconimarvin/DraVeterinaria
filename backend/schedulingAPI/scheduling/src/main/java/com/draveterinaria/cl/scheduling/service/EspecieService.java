package com.draveterinaria.cl.scheduling.service;


import com.draveterinaria.cl.scheduling.model.Especie;
import com.draveterinaria.cl.scheduling.repository.EspecieRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EspecieService {

    private final EspecieRepository repository;

    public List<Especie> listar() {
        return repository.findAll();
    }
}
