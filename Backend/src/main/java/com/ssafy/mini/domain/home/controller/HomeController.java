package com.ssafy.mini.domain.home.controller;

import com.ssafy.mini.domain.home.dto.response.HomeInfoResponse;
import com.ssafy.mini.domain.home.service.HomeService;
import com.ssafy.mini.global.jwt.JwtProvider;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;
    private final JwtProvider jwtProvider;

    @GetMapping("/info")
    @ApiOperation(value = "홈 정보")
    @ApiResponses({
            @ApiResponse(code = 200, message = "홈 정보 조회 성공"),
            @ApiResponse(code = 404, message = "홈 정보 조회 실패"),
            @ApiResponse(code = 406, message = "속한 국가 없음")
    })
    public HomeInfoResponse info(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken){
        log.info("Home Controller Layer:: info() called");

        String memberId = jwtProvider.extractMemberId(accessToken);

        return homeService.info(memberId);
    }
}
