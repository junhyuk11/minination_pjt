package com.ssafy.mini.domain.member.controller;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.mini.domain.member.dto.request.MemberUpdateRequest;
import com.ssafy.mini.domain.member.dto.response.MemberTokenResponse;
import com.ssafy.mini.domain.member.service.MemberService;
import com.ssafy.mini.global.jwt.JwtProvider;
import com.ssafy.mini.global.response.EnvelopeResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @PostMapping("/join")
    @ApiOperation(value = "회원가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 404, message = "회원가입 실패"),
            @ApiResponse(code = 409, message = "중복된 아이디")
    })
    public EnvelopeResponse join(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) MemberJoinRequest memberJoinRequest
    ) {
        return EnvelopeResponse.builder()
                .data(memberService.join(memberJoinRequest))
                .build();
    }

    @PostMapping("/id")
    @ApiOperation(value = "아이디 중복 체크")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 409, message = "중복된 아이디")
    })
    public EnvelopeResponse idCheck(
            @RequestBody @ApiParam(value = "아이디", required = true) MemberLoginRequest memberLoginRequest
    ) {
        memberService.idCheck(memberLoginRequest.getId());
        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 400, message = "잘못된 비밀번호"),
            @ApiResponse(code = 409, message = "존재하지 않는 사용자")
    })
    public EnvelopeResponse<MemberTokenResponse> login(
            @RequestBody @ApiParam(value = "아이디, 비밀번호", required = true) MemberLoginRequest memberLoginRequest
    ) {
        return EnvelopeResponse.<MemberTokenResponse>builder()
                .data(memberService.login(memberLoginRequest))
                .build();
    }

    @PutMapping
    @ApiOperation(value = "회원 정보 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 정보 수정 성공"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 404, message = "회원 정보 수정 실패")
    })
    public EnvelopeResponse update(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
            @RequestBody @ApiParam(value = "회원 정보", required = true) MemberUpdateRequest memberUpdateRequest
    ) {
        String memberId = jwtProvider.validateToken(accessToken);
        memberService.update(memberId, memberUpdateRequest.getPassword());
        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 403, message = "로그아웃 실패")
    })
    public EnvelopeResponse logout(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken
    ) {
        String memberId = jwtProvider.validateToken(accessToken);
        memberService.logout(accessToken, memberId);
        return EnvelopeResponse.builder()
                .build();
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 404, message = "회원 탈퇴 실패")
    })
    public EnvelopeResponse delete(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken
    ) {
        String memberId = jwtProvider.validateToken(accessToken);
        memberService.delete(accessToken, memberId);
        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/check")
    @ApiOperation(value = "회원 메타데이터 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 403, message = "유효하지 않은 토큰"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    public EnvelopeResponse checkInfo(
            @RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken
    ) {
        String memberId = jwtProvider.validateToken(accessToken);
        return EnvelopeResponse.builder()
                .data(memberService.getMemberMetadata(memberId))
                .build();
    }
}
