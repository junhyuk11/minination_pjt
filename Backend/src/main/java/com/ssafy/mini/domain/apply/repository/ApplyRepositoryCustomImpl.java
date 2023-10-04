package com.ssafy.mini.domain.apply.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.apply.entity.QApply;
import com.ssafy.mini.domain.job.entity.Job;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ApplyRepositoryCustomImpl implements ApplyRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    private final QApply apply = QApply.apply;


    @Override
    public List<String> findMemNameByJob(Job job) {
        return queryFactory.select(apply.member.memName)
                .from(apply)
                .where(apply.job.eq(job))
                .fetch();
    }
}
