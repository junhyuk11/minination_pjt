package com.ssafy.mini.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 회원 관련 에러
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    DUPLICATED_ID(HttpStatus.NOT_FOUND, "이미 존재하는 아이디입니다."),

    ;

    private final HttpStatus httpStatus;
    private final String detail;
}
