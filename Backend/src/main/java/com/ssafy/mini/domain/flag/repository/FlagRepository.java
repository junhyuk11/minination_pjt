package com.ssafy.mini.domain.flag.repository;

import com.ssafy.mini.domain.flag.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlagRepository extends JpaRepository<Flag, Integer> {

}
