package com.ssafy.mini.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.member.entity.QMember;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QMember member = QMember.member;

    @Override
    public List<String> findAllStudents(short nationSeq) {
        return queryFactory
                .select(member.memName)
                .from(member)
                .where(member.isoSeq.isoSeq.eq(nationSeq)
                        .and(member.memType.expression.eq("ST")))
                .fetch();
    }

}
