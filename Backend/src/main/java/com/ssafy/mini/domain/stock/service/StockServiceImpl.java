package com.ssafy.mini.domain.stock.service;

import com.ssafy.mini.global.feign.stockInfo.StockInfoClient;
import com.ssafy.mini.global.feign.stockInfo.StockInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final StockInfoClient stockInfoClient;

    @Value("${feign.info.key}")
    private String SERVICE_KEY;
    private final String RESULT_TYPE = "json";

    /**
     * 최근 numsOfRows개의 주가 데이터(일자, 종가, 등락률) 수집
     * @param numsOfRows 가져올 데이터의 수
     * @param stockCode 종목코드
     * @return 최근 주가 동향
     */
    public List<?> stockPriceInfo(int numsOfRows, String stockCode) {
        log.info("Service Layer: stockPriceInfo() 진입");
        StockInfoResponse res = stockInfoClient.stockPriceInfo(SERVICE_KEY, numsOfRows, RESULT_TYPE, stockCode);
        List<StockInfoResponse.Item> items = res.getResponse().getBody().getItems().getItem();

        return items;
    }

}
