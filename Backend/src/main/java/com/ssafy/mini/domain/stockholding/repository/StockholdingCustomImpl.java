package com.ssafy.mini.domain.stockholding.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.stockholding.dto.response.PortfolioResponse;
import com.ssafy.mini.domain.stockholding.entity.QStockholding;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class StockholdingCustomImpl implements StockholdingCustom {

    private final JPAQueryFactory queryFactory;

    private final QStockholding stockholding = QStockholding.stockholding;

    @Override
    public List<PortfolioResponse> findAllByMemberId(String memberId) {
        return queryFactory
                .select(Projections.constructor(PortfolioResponse.class,
                                stockholding.corporation.stkCd.as("code"),
                                stockholding.holdQty,
                                stockholding.stkBuyPrice.as("buyPrice")
                        )
                )
                .from(stockholding)
                .where(stockholding.member.memId.eq(memberId))
                .fetch();
    }

}
