package com.ssafy.mini.domain.stockholding.controller;

import com.ssafy.mini.domain.stockholding.service.CorporationService;
import com.ssafy.mini.domain.stockholding.service.StockholdingService;
import com.ssafy.mini.global.response.SuccessResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
@RequestMapping("/stock")
@RequiredArgsConstructor
public class StockController {

    private final CorporationService corporationService;

    private final StockholdingService stockholdingService;

    @GetMapping("/list")
    @ApiOperation(value = "기업 정보 나열")
    @ApiResponses({
            @ApiResponse(code = 200, message = "기업 정보 나열 성공"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 404, message = "기업 정보 나열 실패")
    })
    public SuccessResponse listCorp(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken
    ) {
        log.info("Controller Layer::list Corporation() called");
        return SuccessResponse.builder()
                .data(corporationService.getCorpInfo())
                .build();
    }


}
