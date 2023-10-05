package com.ssafy.mini.domain.bank.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class BankMyInfoResponse {

    private AssetDto asset;
    private String cardNo;
    private List<FlowDto> flow;
    private List<DetailDto> detail;
    private List<AccountDto> account;

    @Builder
    public BankMyInfoResponse(AssetDto asset, String cardNo, List<FlowDto> flow, List<DetailDto> detail, List<AccountDto> account) {
        this.asset = asset;
        this.cardNo = cardNo;
        this.flow = flow;
        this.detail = detail;
        this.account = account;
    }

}

