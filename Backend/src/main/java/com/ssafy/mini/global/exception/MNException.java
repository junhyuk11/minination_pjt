package com.ssafy.mini.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MNException extends RuntimeException {
    private final ErrorCode errorCode;
}
