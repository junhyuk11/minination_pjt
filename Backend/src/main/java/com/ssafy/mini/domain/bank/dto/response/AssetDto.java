package com.ssafy.mini.domain.bank.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AssetDto {
    private int cash;
    private int stock;
    private int save;

    @Builder
    public AssetDto(int cash, int stock, int save) {
        this.cash = cash;
        this.stock = stock;
        this.save = save;
    }
}
