package com.ssafy.mini.domain.stockholding.service;

import com.ssafy.mini.domain.stockholding.dto.request.BuyStockRequest;
import com.ssafy.mini.domain.stockholding.dto.response.MyStockInfoResponse;

public interface StockholdingService {

    MyStockInfoResponse getPortfolio(String memberId);

//    MyStockInfoResponse buyStockItem(String memberId, BuyStockRequest buyStockRequest);

}
