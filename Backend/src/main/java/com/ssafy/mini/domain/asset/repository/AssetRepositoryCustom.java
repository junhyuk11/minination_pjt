package com.ssafy.mini.domain.asset.repository;

import com.ssafy.mini.domain.home.dto.response.ChartDto;

import java.util.List;

public interface AssetRepositoryCustom {

    List<ChartDto> getAssetsByNation(short isoSeq);

}
