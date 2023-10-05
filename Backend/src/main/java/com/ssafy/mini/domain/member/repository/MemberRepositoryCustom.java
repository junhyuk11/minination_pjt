package com.ssafy.mini.domain.member.repository;

import com.ssafy.mini.domain.home.dto.response.RichDto;
import com.ssafy.mini.domain.job.entity.Job;

import java.util.List;

public interface MemberRepositoryCustom {

    List<String> findAllStudents(short nationSeq);

    List<RichDto> listRich(short nationSeq);

    List<String> findMemNameByJobSeq(Job job);


}
