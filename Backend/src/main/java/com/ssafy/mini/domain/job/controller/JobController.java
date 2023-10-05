package com.ssafy.mini.domain.job.controller;

import com.ssafy.mini.domain.job.dto.request.*;
import com.ssafy.mini.domain.job.service.JobService;
import com.ssafy.mini.global.jwt.JwtProvider;
import com.ssafy.mini.global.response.EnvelopeResponse;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final JwtProvider jwtProvider;

    @PostMapping("/register")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 등록 성공"),
            @ApiResponse(code = 400, message = "모집 인원은 1보다 작을 수 없습니다."),
            @ApiResponse(code = 402, message = "선생님만 등록할 수 있습니다."),
            @ApiResponse(code = 404, message = "직업 등록 실패"),
            @ApiResponse(code = 406, message = "주급은 0보다 작을 수 없습니다. "),
            @ApiResponse(code = 409, message = "직업 이름 중복")
    })
    public EnvelopeResponse register(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                    @RequestBody @ApiParam(value = "직업 등록 정보", required = true) JobRegisterRequest jobRegisterRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        jobService.register(memberId, jobRegisterRequest);

        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/apply")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 지원 성공"),
            @ApiResponse(code = 404, message = "직업 지원 실패"),
            @ApiResponse(code = 406, message = "모집 인원이 남아있지 않습니다."),
            @ApiResponse(code = 409, message = "이미 지원했거나 근무 중인 직업입니다.")
    })
    public EnvelopeResponse apply(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                 @RequestBody @ApiParam(value = "직업 이름", required = true) JobApplyRequest jobApplyRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        jobService.apply(memberId, jobApplyRequest);

        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/approve")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 승인 성공"),
            @ApiResponse(code = 404, message = "직업 승인 실패"),
    })
    public EnvelopeResponse approve(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                   @RequestBody @ApiParam(value = "직업 신청 내용", required = true) JobApproveRequest jobApproveRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        jobService.approve(memberId, jobApproveRequest);

        return EnvelopeResponse.builder()
                .build();
    }

    @GetMapping("/list")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 리스트 조회 성공"),
            @ApiResponse(code = 404, message = "직업 리스트 조회 실패"),
    })
    public EnvelopeResponse list(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        return EnvelopeResponse.builder()
                .data(jobService.getJobList(memberId))
                .build();
    }

    @PostMapping("/decline")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 신청 거절 성공"),
            @ApiResponse(code = 404, message = "직업 신청 거절 실패"),
    })
    public EnvelopeResponse decline(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                   @RequestBody @ApiParam(value = "직업 거절 내용", required = true) JobDeclineRequest jobDeclineRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        jobService.decline(memberId, jobDeclineRequest);

        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/fire")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 해고 성공"),
            @ApiResponse(code = 404, message = "직업 해고 실패")
    })
    public EnvelopeResponse fire(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                @RequestBody @ApiParam(value = "해고할 직업 이름", required = true) JobFireRequest jobFireRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        jobService.fire(memberId, jobFireRequest);

        return EnvelopeResponse.builder()
                .build();
    }

    @PostMapping("/detail")
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 상세 조회 성공"),
            @ApiResponse(code = 404, message = "직업 상세 조회 실패")
    })
    public EnvelopeResponse detail(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                  @RequestBody @ApiParam(value = "직업 이름", required = true) JobDetailRequest jobDetailRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);
        String jobName = jobDetailRequest.getJobName();

        return EnvelopeResponse.builder()
                .data(jobService.getJobDetail(memberId, jobName))
                .build();
    }

    @DeleteMapping
    @ApiResponses({
            @ApiResponse(code = 200, message = "직업 삭제 성공"),
            @ApiResponse(code = 404, message = "직업 삭제 실패")
    })
    public EnvelopeResponse delete(@RequestHeader("Authorization") @ApiParam(value = "토큰", required = true) String accessToken,
                                  @RequestBody @ApiParam(value = "직업 이름", required = true) JobDeleteRequest jobDeleteRequest) {
        String memberId = jwtProvider.extractMemberId(accessToken);

        jobService.delete(memberId, jobDeleteRequest);

        return EnvelopeResponse.builder()
                .build();
    }

}
