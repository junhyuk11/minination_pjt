package com.ssafy.mini.domain.nation.repository;

import com.ssafy.mini.domain.nation.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NationRepository extends JpaRepository<Nation, Short> {

    Optional<Nation> findByIsoName(String isoName);

}
