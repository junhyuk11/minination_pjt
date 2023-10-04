package com.ssafy.mini.domain.stockholding.repository;

import com.ssafy.mini.domain.stockholding.dto.response.PortfolioDto;
import com.ssafy.mini.domain.stockholding.entity.Stockholding;

import java.util.List;
import java.util.Optional;

public interface StockholdingCustom {

    List<PortfolioDto> findAllByMemberId(String memberId);

    Optional<Stockholding> findByMemberIdAndCode(String memberId, String code);

}
