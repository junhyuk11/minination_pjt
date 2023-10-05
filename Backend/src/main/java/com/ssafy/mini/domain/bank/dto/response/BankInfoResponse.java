package com.ssafy.mini.domain.bank.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class BankInfoResponse {

    private List<Map<String, String>> deposit;  // 예금
    private List<Map<String, String>> saving;   // 적금

    @Builder
    public BankInfoResponse(List<Map<String, String>> deposit, List<Map<String, String>> saving) {
        this.deposit = deposit;
        this.saving = saving;
    }

}
