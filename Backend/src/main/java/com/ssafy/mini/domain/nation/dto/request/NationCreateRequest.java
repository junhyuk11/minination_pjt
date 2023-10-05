package com.ssafy.mini.domain.nation.dto.request;

import lombok.Getter;

@Getter
public class NationCreateRequest {
    private String nationName;
    private String currency;
    private String payday;
    private byte incomeTax;
    private byte vat;
    private String flagImgUrl;
}