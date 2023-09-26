package com.ssafy.mini.domain.shop.repository;

import com.ssafy.mini.domain.shop.entity.Possess;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PossessRepository extends JpaRepository<Possess, Integer>, PossessRepositoryCustom {

    Optional<Possess> findByMemberIdAndName(String memberId, String name);
}
