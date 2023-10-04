package com.ssafy.mini.global.exception.handler;

import com.ssafy.mini.global.exception.MNException;
import com.ssafy.mini.global.response.EnvelopeResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {MNException.class})
    public ResponseEntity<EnvelopeResponse> handleSuccessResponse(MNException e) {

        log.error(e.getErrorCode().getDetail());

        return ResponseEntity
                .status(e.getErrorCode().getCode())
                .body(EnvelopeResponse.builder()
                        .code(e.getErrorCode().getCode())
                        .message("fail")
                        .data(e.getErrorCode().getDetail())
                        .build());
    }

}
