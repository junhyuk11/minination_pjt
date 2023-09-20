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
    private final int NUMS_OF_ROWS = 10;
    private final String RESULT_TYPE = "json";

    public List<?> stockPriceInfo(String stockCode) {
        log.info("Service Layer: stockPriceInfo() 진입");
        StockInfoResponse res = stockInfoClient.stockPriceInfo(SERVICE_KEY, NUMS_OF_ROWS, RESULT_TYPE, stockCode);
        List<StockInfoResponse.Item> items = res.getResponse().getBody().getItems().getItem();

        return items;
    }

}
