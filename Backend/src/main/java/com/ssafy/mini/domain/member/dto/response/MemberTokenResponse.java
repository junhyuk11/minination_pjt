package com.ssafy.mini.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberTokenResponse {

    private String memType;
    private String nationName;
    private String accessToken;
    private String refreshToken;

    @Builder
    public MemberTokenResponse(String memType, String nationName, String accessToken, String refreshToken) {
        this.memType = memType;
        this.nationName = nationName;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
