package com.ssafy.mini.domain.stockholding.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.stockholding.dto.response.PortfolioDto;
import com.ssafy.mini.domain.stockholding.entity.QStockholding;
import com.ssafy.mini.domain.stockholding.entity.Stockholding;
import lombok.RequiredArgsConstructor;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class StockholdingCustomImpl implements StockholdingCustom {

    private final JPAQueryFactory queryFactory;

    private final QStockholding stockholding = QStockholding.stockholding;

    @Override
    public List<PortfolioDto> findAllByMemberId(String memberId) {
        return queryFactory
                .select(Projections.constructor(PortfolioDto.class,
                                stockholding.corporation.stkCd.as("code"),
                                stockholding.holdQty,
                                stockholding.stkBuyPrice.as("buyPrice")
                        )
                )
                .from(stockholding)
                .where(stockholding.member.memId.eq(memberId))
                .fetch();
    }

    @Override
    public Optional<Stockholding> findByMemberIdAndCode(String memberId, String code) {
        return Optional.ofNullable(queryFactory
                .select(stockholding)
                .from(stockholding)
                .where(stockholding.member.memId.eq(memberId)
                        .and(stockholding.corporation.stkCd.eq(code)))
                .fetchOne()
        );
    }

}
