package com.ssafy.mini.domain.law.controller;

import com.ssafy.mini.domain.nation.dto.response.LawInfoResponse;
import com.ssafy.mini.domain.nation.service.NationService;
import com.ssafy.mini.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/law")
@RequiredArgsConstructor
public class LawContoller {

    private final JwtProvider jwtProvider;
    private final NationService nationService;

    @GetMapping("/info")
    @ApiOperation(value = "헌법 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "헌법 조회 성공"),
            @ApiResponse(code = 404, message = "헌법 조회 실패")
    })
    public LawInfoResponse info(@RequestHeader("Authorization") String accessToken) {
        log.info("Law Controller Layer:: info() called");

        String memberId = jwtProvider.extractMemberId(accessToken);

        return nationService.info(memberId);
    }

}
