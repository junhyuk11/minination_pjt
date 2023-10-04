package com.ssafy.mini.domain.stockholding.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
public class CorpStockInfoResponse {
    private String time;
    private int value;

    @Builder
    public CorpStockInfoResponse(Date date, int value) {
        this.time = formatDate(date);
        this.value = value;
    }

    private String formatDate(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(date);
    }
}
