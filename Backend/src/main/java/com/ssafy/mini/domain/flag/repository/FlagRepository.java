package com.ssafy.mini.domain.flag.repository;

import com.ssafy.mini.domain.flag.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlagRepository extends JpaRepository<Flag, Byte> {

    Optional<Flag> findFlagByFlagUrl(String flagUrl);
}
