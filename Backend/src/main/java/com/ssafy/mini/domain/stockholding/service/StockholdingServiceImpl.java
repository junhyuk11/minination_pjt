package com.ssafy.mini.domain.stockholding.service;

import com.ssafy.mini.domain.stockholding.dto.request.BuyStockRequest;
import com.ssafy.mini.domain.stockholding.dto.response.MyStockInfoResponse;
import com.ssafy.mini.domain.stockholding.dto.response.PortfolioResponse;
import com.ssafy.mini.domain.stockholding.entity.Stockholding;
import com.ssafy.mini.domain.stockholding.repository.StockRepository;
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
    private final StockRepository stockRepository;

    @Override
    public MyStockInfoResponse getPortfolio(String memberId) {
        log.info("Service Layer::getPortfolio() called");

        // 보유한 주가 정보 가져오기
        List<PortfolioResponse> portfolio = stockholdingRepository.findAllByMemberId(memberId);

        // 주식 보유 자산
        int balance = 0;
        for (PortfolioResponse p : portfolio) {
            int currentPrice = getCurrentPrice(p.getCode());
            p.setCurPrice(currentPrice);
            balance += p.getCurPrice();
        }

        return MyStockInfoResponse.builder()
                .balance(balance)
                .portfolio(portfolio)
                .build();
    }

//    @Override
//    public MyStockInfoResponse buyStockItem(String memberId, BuyStockRequest buyStockRequest) {
//        log.info("Service Layer::buyStockItem() called");
//
//        Stockholding stockholding = stockholdingRepository.findByMemberIdAndCode(memberId, buyStockRequest.getCode());
//
//        // 구매할 돈이 부족한 경우
//
//
//        stockholding.updateHoldQty(buyStockRequest.getAmount()); // 보유 주 수 변경
//        stockholding.updateStkBuyPrice(); // 구매 가격 변경
//        stockholdingRepository.save(stockholding);
//
//        return getPortfolio(memberId);
//    }

    /**
     * 현재 주식 가치 가져오기
     * @param code 종목 코드
     * @return 현재 가치
     */
    private int getCurrentPrice(String code) {
        return stockRepository.getstkPriceByStkCd(code);
    }
}
