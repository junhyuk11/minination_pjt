package com.ssafy.mini.domain.shop.repository;

import com.ssafy.mini.domain.shop.entity.Possess;

import java.util.Optional;

public interface PossessRepositoryCustom {

    Optional<Possess> findByMemberIdAndName(String memberId, String name);

    Integer countPossessByMemberId (String memberId);

}
