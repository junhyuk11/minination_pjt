package com.ssafy.mini.domain.auth.service;

import com.ssafy.mini.domain.auth.dto.response.ReissueResponse;
import com.ssafy.mini.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;

    @Override
    public ReissueResponse reissue(String refreshToken) {
        return new ReissueResponse(jwtProvider.reIssue(refreshToken));
    }
}
