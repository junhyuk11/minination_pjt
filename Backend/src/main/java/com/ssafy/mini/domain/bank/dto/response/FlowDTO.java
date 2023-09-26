package com.ssafy.mini.domain.bank.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FlowDTO{
    private String date;
    private int asset;

    @Builder
    public FlowDTO(String date, int asset){
        this.date = date;
        this.asset = asset;
    }
}
