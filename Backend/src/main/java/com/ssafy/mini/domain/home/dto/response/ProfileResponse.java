package com.ssafy.mini.domain.home.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProfileResponse {
    private String name;
    private String job;
    private int pay;
    private String currency;

    @Builder
    public ProfileResponse(String name, String job, int pay, String currency) {
        this.name = name;
        this.job = job;
        this.pay = pay;
        this.currency = currency;
    }
}
