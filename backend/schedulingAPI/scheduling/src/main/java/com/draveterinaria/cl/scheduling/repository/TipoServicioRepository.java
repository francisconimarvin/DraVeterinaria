package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.TipoServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoServicioRepository extends JpaRepository<TipoServicio, Long> {}

