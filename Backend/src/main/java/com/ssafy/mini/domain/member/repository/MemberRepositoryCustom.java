package com.ssafy.mini.domain.member.repository;

import java.util.List;

public interface MemberRepositoryCustom {

    List<String> findAllStudents(short nationSeq);

}
