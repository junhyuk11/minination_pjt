package com.ssafy.mini.domain.shop.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.shop.entity.Possess;
import com.ssafy.mini.domain.shop.entity.QPossess;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class PossessRepositoryCustomImpl implements PossessRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    private final QPossess possess = QPossess.possess;


    @Override
    public Optional<Possess> findByMemberIdAndName(String memberId, String name) {
        return Optional.ofNullable(queryFactory.select(possess)
                .from(possess)
                .where(possess.memSeq.memId.eq(name)
                        .and(possess.prodSeq.prodName.eq(name))
                )
                .fetchOne());
    }
}
