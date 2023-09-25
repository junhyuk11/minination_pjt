package com.ssafy.mini.domain.bank.dto.response;

import lombok.Getter;

import java.util.Date;

@Getter
public class BankSubscribeResponseDTO {

    private String type;
    private String category;
    private Date start;
    private Date end;
    private int principal;
    private int estimation;

}
