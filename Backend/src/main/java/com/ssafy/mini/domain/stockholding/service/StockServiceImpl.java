package com.ssafy.mini.domain.stockholding.service;

import com.ssafy.mini.domain.stockholding.entity.Corporation;
import com.ssafy.mini.domain.stockholding.repository.CorporationRepository;
import com.ssafy.mini.domain.stockholding.dto.response.CorpStockInfoResponse;
import com.ssafy.mini.domain.stockholding.dto.response.StockPriceRateResponse;
import com.ssafy.mini.domain.stockholding.entity.Stock;
import com.ssafy.mini.domain.stockholding.repository.StockRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import com.ssafy.mini.global.feign.stockInfo.Item;
import com.ssafy.mini.global.feign.stockInfo.StockInfoClient;
import com.ssafy.mini.global.feign.stockInfo.StockInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    private final CorporationRepository corporationRepository;

    private final StockInfoClient stockInfoClient;

    @Value("${feign.info.key}")
    private String SERVICE_KEY;
    private final String RESULT_TYPE = "json";

    /**
     * 새로운 기업의 지난 60일 주가 정보 수집 및 저장
     * @param code 종목코드
     */
    @Override
    public void initCorpStock(String code) {
        log.info("Service Layer: initCorpStock() called");
        List<Item> items = stockPriceInfo(60, code);
        Corporation corp = corporationRepository.findById(code)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_STOCK));

        stockRepository.saveAll(stockInfoToStock(corp, items));
    }

    @Override
    public List<CorpStockInfoResponse> getStockInfo(String code) {
        return stockRepository.findByStkCode(code);
    }

    @Override
    public StockPriceRateResponse getStockInfoByDate(String code, Date date) {
        return stockRepository.findByStkCodeAndStkDt(code, date);
    }

    /**
     * 최근 numsOfRows개의 주가 데이터(일자, 종가, 등락률) 수집
     * @param numsOfRows 가져올 데이터의 수
     * @param stockCode 종목코드
     * @return 최근 주가 동향
     */
    private List<Item> stockPriceInfo(int numsOfRows, String stockCode) {
        log.info("Service Layer: stockPriceInfo() 진입");
        StockInfoResponse res = stockInfoClient.stockPriceInfo(SERVICE_KEY, numsOfRows, RESULT_TYPE, stockCode);
        List<Item> items = res.getResponse().getBody().getItems().getItem();

        return items;
    }

    /**
     * StockInfoResponse -> Stock
     * @param items 수집한 주가 정보
     * @return
     */
    private List<Stock> stockInfoToStock(Corporation corp, List<Item> items) {
        return items.stream()
                .map(item -> Stock.builder()
                        .stkCd(corp)
                        .stkDt(item.getBasDt())
                        .stkPrice(item.getClpr())
                        .stkRate(item.getFltRt())
                        .build()
                )
                .collect(Collectors.toList());
    }

}
