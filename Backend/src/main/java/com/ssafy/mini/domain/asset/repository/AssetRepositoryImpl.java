package com.ssafy.mini.domain.asset.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mini.domain.asset.entity.QAsset;
import com.ssafy.mini.domain.home.dto.response.ChartDto;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class AssetRepositoryImpl implements AssetRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QAsset asset = QAsset.asset;

    @Override
    public List<ChartDto> getAssetsByNation(short isoSeq) {
        return queryFactory
                .select(Projections.constructor(ChartDto.class,
                        asset.assetDt.as("date"),
                        asset.assetBalance.as("value")
                        )
                )
                .from(asset)
                .where(asset.nation.isoSeq.eq(isoSeq))
                .fetch();
    }
}