package com.ssafy.mini.domain.bank.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BankSubscribeResponse {

    private String type;
    private String category;
    private String start;
    private String end;
    private int principal;
    private int estimation;

    @Builder
    public BankSubscribeResponse(String type, String category, String start, String end, int principal, int estimation) {
        this.type = type;
        this.category = category;
        this.start = start;
        this.end = end;
        this.principal = principal;
        this.estimation = estimation;
    }

}
