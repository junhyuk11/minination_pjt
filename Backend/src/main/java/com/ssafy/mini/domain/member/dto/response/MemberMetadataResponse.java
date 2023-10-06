package com.ssafy.mini.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberMetadataResponse {

    private String memType;
    private String nationName;

    @Builder
    public MemberMetadataResponse(String memType, String nationName) {
        this.memType = memType;
        this.nationName = nationName;
    }
}
