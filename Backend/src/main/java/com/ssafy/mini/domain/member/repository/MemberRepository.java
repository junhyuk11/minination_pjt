package com.ssafy.mini.domain.member.repository;

import com.ssafy.mini.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    boolean existsByMemId(String memId);

}
