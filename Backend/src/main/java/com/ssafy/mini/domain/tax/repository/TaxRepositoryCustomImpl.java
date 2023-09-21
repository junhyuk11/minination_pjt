package com.ssafy.mini.domain.tax.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.tax.entity.QTax;
import com.ssafy.mini.domain.tax.entity.Tax;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TaxRepositoryCustomImpl implements TaxRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QTax tax = QTax.tax;

    @Override
    public Tax findTaxByNationSeqAndTaxType(Short nationSeq, String taxType) {
        return queryFactory
                .select(tax)
                .from(tax)
                .where(tax.nation.isoSeq.eq(nationSeq)
                        .and(tax.taxType.code.eq(taxType)))
                .fetchOne();
    }
}
