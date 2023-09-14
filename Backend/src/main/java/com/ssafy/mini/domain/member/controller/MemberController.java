package com.ssafy.mini.domain.member.controller;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.mini.domain.member.dto.response.MemberLoginResponse;
import com.ssafy.mini.domain.member.service.MemberService;
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
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    @ApiOperation(value = "회원가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 404, message = "회원가입 실패"),
            @ApiResponse(code = 409, message = "중복된 아이디")
    })
    public SuccessResponse join(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) MemberJoinRequest memberJoinRequest
            ) {
        log.info("Controller Layer::join() called");
        memberService.join(memberJoinRequest);
        return SuccessResponse.builder()
                .build();
    }

    @PostMapping("/id")
    @ApiOperation(value = "아이디 중복 체크")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 409, message = "중복된 아이디")
    })
    public SuccessResponse idCheck(
            @RequestBody @ApiParam(value = "아이디", required = true) MemberLoginRequest memberLoginRequest
    ) {
        log.info("Controller Layer::idCheck() called");
        memberService.idCheck(memberLoginRequest.getId());
        return SuccessResponse.builder()
                .build();
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 400, message = "잘못된 비밀번호"),
            @ApiResponse(code = 409, message = "존재하지 않는 사용자")
    })
    public SuccessResponse<MemberLoginResponse> login(
            @RequestBody @ApiParam(value = "아이디, 비밀번호", required = true) MemberLoginRequest memberLoginRequest
    ){
        log.info("Controller Layer::login() called");
        return SuccessResponse.<MemberLoginResponse>builder()
                .data(memberService.login(memberLoginRequest))
                .build();
    }

}
