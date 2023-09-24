package com.ssafy.mini.domain.stock.service;

import java.util.List;

public interface StockService {

    List stockPriceInfo(int numsOfRows, String stockCode);

}
