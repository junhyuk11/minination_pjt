package com.ssafy.mini.domain.bank.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FlowDto {
    private String time;
    private int asset;

    @Builder
    public FlowDto(String time, int asset){
        this.time = time;
        this.asset = asset;
    }
}
