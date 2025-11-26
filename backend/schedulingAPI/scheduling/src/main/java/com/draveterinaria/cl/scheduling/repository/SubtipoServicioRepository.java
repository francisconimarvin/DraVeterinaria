package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.SubtipoServicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubtipoServicioRepository extends JpaRepository<SubtipoServicio, Long >{

    List<SubtipoServicio> findByTipoServicio_IdTipo(Long idTipo);
}
