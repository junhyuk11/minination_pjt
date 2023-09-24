package com.ssafy.mini.domain.stockholding.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BuyStockRequest {

    private String code;
    private int amount;

}
