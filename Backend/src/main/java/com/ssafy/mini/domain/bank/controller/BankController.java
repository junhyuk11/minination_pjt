package com.ssafy.mini.domain.bank.controller;

import com.ssafy.mini.domain.bank.dto.request.BankSubscribeRequest;
import com.ssafy.mini.domain.bank.dto.request.BankTerminateRequest;
import com.ssafy.mini.domain.bank.service.BankService;
import com.ssafy.mini.global.jwt.JwtProvider;
import com.ssafy.mini.global.response.EnvelopeResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bank")
public class BankController {

    private final JwtProvider jwtProvider;
    private final BankService bankService;

    @ApiOperation(value = "은행 상품 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "은행 상품 정보 조회 성공"),
            @ApiResponse(code = 404, message = "은행 상품 정보 조회 실패")
    })
    @GetMapping("/info")
    public EnvelopeResponse getBankInfo(@RequestHeader("Authorization") String accessToken) {
        return EnvelopeResponse.builder()
                .data(bankService.info())
                .build();
    }

    @ApiOperation(value = "은행 상품 가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "은행 상품 가입 성공"),
            @ApiResponse(code = 404, message = "은행 상품 가입 실패"),
            @ApiResponse(code = 406, message = "은행 상품 가입 실패"),
            @ApiResponse(code = 409, message = "이미 가입한 상품")
    })
    @PostMapping("/subscribe")
    public EnvelopeResponse subscribe(@RequestHeader("Authorization") String accessToken,
                                     @RequestBody BankSubscribeRequest bankSubscribeRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        return EnvelopeResponse.builder()
                .data(bankService.subscribe(memberId, bankSubscribeRequest))
                .build();
    }

    @ApiOperation(value = "은행 상품 해지")
    @ApiResponses({
            @ApiResponse(code = 200, message = "은행 상품 해지 성공"),
            @ApiResponse(code = 404, message = "은행 상품 해지 실패")
    })
    @PostMapping("/terminate")
    public EnvelopeResponse terminate(@RequestHeader("Authorization") String accessToken,
                                     @RequestBody BankTerminateRequest bankTerminateRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        return EnvelopeResponse
                .builder()
                .data(bankService.terminate(memberId, bankTerminateRequest))
                .build();
    }

    @ApiOperation(value = "내 자산 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "내 자산 조회 성공"),
            @ApiResponse(code = 404, message = "내 자산 조회 실패")
    })
    @GetMapping()
    public EnvelopeResponse myAsset(@RequestHeader("Authorization") String accessToken) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        return EnvelopeResponse.builder()
                .data(bankService.myAsset(memberId))
                .build();
    }

}
