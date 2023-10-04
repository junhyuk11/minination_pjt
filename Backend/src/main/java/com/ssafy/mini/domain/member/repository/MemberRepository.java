package com.ssafy.mini.domain.member.repository;

import com.ssafy.mini.domain.home.dto.response.RichDto;
import com.ssafy.mini.domain.job.entity.Job;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.nation.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer>, MemberRepositoryCustom {

    boolean existsByMemId(String memId);

    Optional<Member> findByMemId(String memId);

    List<String> findMemNameByJobSeq(Job job);

    int countByIsoSeq(Nation nation);

    List<String> findAllStudents(short nationSeq);

    List<RichDto> listRich(short nationSeq);

    Optional<Member> findByMemName(String employeeName);

    List<Member> findAllByJobSeq(Job job);
}
