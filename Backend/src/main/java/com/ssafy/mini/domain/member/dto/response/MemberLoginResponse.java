package com.ssafy.mini.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberLoginResponse {

    private Character memType;
    private String accessToken;
    private String refreshToken;

    @Builder
    public MemberLoginResponse(char memType, String accessToken, String refreshToken) {
        this.memType = memType;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
