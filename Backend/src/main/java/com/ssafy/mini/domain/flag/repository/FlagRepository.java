package com.ssafy.mini.domain.flag.repository;

import com.ssafy.mini.domain.flag.entity.Flag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface FlagRepository extends JpaRepository<Flag, Byte> {

    Optional<Flag> findFlagByFlagUrl(String flagUrl);

    @Query("select f.flagUrl from flag f")
    List<String> findAllFlagUrl();
}
