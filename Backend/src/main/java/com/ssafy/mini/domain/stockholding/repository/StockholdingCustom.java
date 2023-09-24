package com.ssafy.mini.domain.stockholding.repository;

import com.ssafy.mini.domain.stockholding.dto.response.PortfolioResponse;

import java.util.List;

public interface StockholdingCustom {

    List<PortfolioResponse> findAllByMemberId(String memberId);

}
