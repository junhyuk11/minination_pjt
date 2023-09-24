package com.ssafy.mini.domain.stockholding.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PortfolioResponse {

    private String code;
    private int holdQty; // 보유 주 수
    private int buyPrice; // 구매 금액

    @Builder
    public PortfolioResponse(String code, int holdQty, int buyPrice) {
        this.code = code;
        this.holdQty = holdQty;
        this.buyPrice = buyPrice / holdQty;
    }
}
