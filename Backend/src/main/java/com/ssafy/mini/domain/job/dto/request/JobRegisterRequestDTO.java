package com.ssafy.mini.domain.job.dto.request;

import lombok.Getter;

@Getter
public class JobRegisterRequestDTO {
    private String name;
    private String desc;
    private int pay;
    private Byte recruitTotalCount;
    private String requirement;
}
