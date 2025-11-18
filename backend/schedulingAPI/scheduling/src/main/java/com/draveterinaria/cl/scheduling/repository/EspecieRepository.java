package com.draveterinaria.cl.scheduling.repository;

import com.draveterinaria.cl.scheduling.model.Especie;
import com.draveterinaria.cl.scheduling.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecieRepository extends JpaRepository<Especie, Long> {

}
