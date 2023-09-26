package com.ssafy.mini.domain.asset.repository;

import com.ssafy.mini.domain.asset.entity.Asset;
import com.ssafy.mini.domain.home.dto.response.ChartDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Integer>, AssetRepositoryCustom {

    List<ChartDto> getAssetsByNation(short isoSeq);

}
