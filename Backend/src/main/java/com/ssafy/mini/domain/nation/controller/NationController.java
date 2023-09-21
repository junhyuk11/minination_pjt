package com.ssafy.mini.domain.nation.controller;

import com.ssafy.mini.domain.nation.dto.request.NationCreateRequest;
import com.ssafy.mini.domain.nation.service.NationService;
import com.ssafy.mini.global.jwt.JwtProvider;
import com.ssafy.mini.global.response.SuccessResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/nation")
@RequiredArgsConstructor
public class NationController {

    private final NationService nationService;

    private final JwtProvider jwtProvider;

    @PostMapping("/create")
    @ApiOperation(value = "국가 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "국가 생성 성공"),
            @ApiResponse(code = 404, message = "국가 생성 실패")
    })
    public SuccessResponse create(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken, @RequestBody @ApiParam(value = "국가 생성 정보", required = true) NationCreateRequest nationCreateRequest) {
        log.info("Controller Layer::create() called");

        String memberId = jwtProvider.extractMemberId(accessToken);

        nationService.create(memberId, nationCreateRequest);
        return SuccessResponse.builder()
                .build();
    }


}
