package com.ssafy.mini.domain.bank.dto.request;

import lombok.Getter;

@Getter
public class BankTerminateRequest {
    private String type;
    private byte term;
}
