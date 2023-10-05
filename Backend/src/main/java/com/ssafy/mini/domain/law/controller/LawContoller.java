package com.ssafy.mini.domain.law.controller;

import com.ssafy.mini.domain.nation.dto.request.LawUpdateRequest;
import com.ssafy.mini.domain.nation.service.NationService;
import com.ssafy.mini.global.jwt.JwtProvider;
import com.ssafy.mini.global.response.EnvelopeResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public EnvelopeResponse info(@RequestHeader("Authorization") String accessToken) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        return EnvelopeResponse.builder()
                .data(nationService.info(memberId))
                .build();

    }

    @PutMapping
    @ApiOperation(value = "헌법 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "헌법 수정 성공"),
            @ApiResponse(code = 404, message = "헌법 수정 실패")
    })
    public EnvelopeResponse update(@RequestHeader("Authorization") String accessToken,
                                            @RequestBody @ApiParam(value = "국가 수정 정보", required = true) LawUpdateRequest lawUpdateRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        nationService.updateLaw(memberId, lawUpdateRequest);

        return EnvelopeResponse.builder()
                .build();
    }


}
