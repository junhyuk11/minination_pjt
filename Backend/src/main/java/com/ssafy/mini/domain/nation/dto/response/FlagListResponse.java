package com.ssafy.mini.domain.nation.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class FlagListResponse {
    List<String> flagImgUrl;

    @Builder
    public FlagListResponse(List<String> flagImgUrl) {
        this.flagImgUrl = flagImgUrl;
    }
}
