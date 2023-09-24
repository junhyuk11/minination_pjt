package com.ssafy.mini.domain.stockholding.service;

import com.ssafy.mini.domain.stockholding.dto.response.MyStockInfoResponse;
import com.ssafy.mini.domain.stockholding.dto.response.PortfolioResponse;
import com.ssafy.mini.domain.stockholding.repository.StockholdingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockholdingServiceImpl implements StockholdingService {

    private final StockholdingRepository stockholdingRepository;

    @Override
    public MyStockInfoResponse getPortfolio(String memberId) {
        log.info("Service Layer::getPortfolio() called");

        // 보유한 주가 정보 가져오기
        List<PortfolioResponse> portfolio = stockholdingRepository.findAllByMemberId(memberId);

        // 주식 보유 자산
        int balance = 0;
        for (PortfolioResponse p : portfolio) {
            balance += p.getHoldQty() * p.getBuyPrice();
        }

        return MyStockInfoResponse.builder()
                .balance(balance)
                .portfolio(portfolio)
                .build();
    }
}
