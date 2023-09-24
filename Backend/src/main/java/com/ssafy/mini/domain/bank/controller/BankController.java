package com.ssafy.mini.domain.bank.controller;

import com.ssafy.mini.domain.bank.dto.response.BankInfoResponseDTO;
import com.ssafy.mini.domain.bank.service.BankService;
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
@RequiredArgsConstructor
@RequestMapping("/bank")
public class BankController {

    private final BankService bankService;

    @ApiOperation(value = "은행")
    @ApiResponses({
            @ApiResponse(code = 200, message = "은행 정보 조회 성공"),
            @ApiResponse(code = 404, message = "은행 정보 조회 실패")
    })
    @GetMapping("/info")
    public BankInfoResponseDTO getBankInfo(@RequestHeader("Authorization") String accessToken) {

        log.info("Bank Controller Layer:: getBankInfo() called");

        return bankService.info();
    }
}
