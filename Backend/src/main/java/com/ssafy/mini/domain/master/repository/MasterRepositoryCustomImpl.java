package com.ssafy.mini.domain.master.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.master.entity.QMaster;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MasterRepositoryCustomImpl implements MasterRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QMaster master = QMaster.master;

    @Override
    public String findCodeByExpression(String expression) {
        return queryFactory
                .select(master.code)
                .from(master)
                .where(master.expression.eq(expression))
                .fetchOne();
    }
}
