package com.ssafy.mini.domain.auth.controller;

import com.ssafy.mini.domain.auth.dto.response.ReissueResponse;
import io.netty.handler.codec.HeadersUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @PostMapping()
    @ApiOperation(value = "토큰 재발급")
    @ApiResponses({
            @ApiResponse(code = 200, message = "토큰 재발급 성공"),
            @ApiResponse(code = 404, message = "토큰 재발급 실패")
    })
    public ReissueResponse reissue() {
        return null;
    }

    @GetMapping("/test")
    public String test() {
    	return "test";
    }

}
