package com.ssafy.mini.domain.stock;


import com.ssafy.mini.domain.stock.service.StockService;
import com.ssafy.mini.global.feign.stockInfo.StockInfoResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class StockTest {

    @Autowired
    private StockService stockService;

    @Test
    public void 주가정보_api_호출() {
        // when
        int numsOfRows = 10;
        String stockCode = "005930";
        List<?> list = stockService.stockPriceInfo(numsOfRows, stockCode);

        // then
        list.forEach(System.out::println);
    }

}
