package com.ssafy.mini.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 회원 관련 에러
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    DUPLICATED_ID(HttpStatus.CONFLICT, "이미 존재하는 아이디입니다."),
    NO_SUCH_MEMBER_TYPE(HttpStatus.NOT_FOUND, "존재하지 않는 회원 타입입니다."),


    // JWT
    INVALID_TOKEN(HttpStatus.NOT_FOUND, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.FORBIDDEN, "만료된 토큰입니다."),

    ;

    private final HttpStatus httpStatus;
    private final String detail;

    ErrorCode(HttpStatus httpStatus, String detail) {
        this.httpStatus = httpStatus;
        this.detail = detail;
    }
}
