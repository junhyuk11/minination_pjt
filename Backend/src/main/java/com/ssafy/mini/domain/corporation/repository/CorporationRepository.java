package com.ssafy.mini.domain.corporation.repository;

import com.ssafy.mini.domain.corporation.entity.Corporation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorporationRepository extends JpaRepository<Corporation, String> {
}
