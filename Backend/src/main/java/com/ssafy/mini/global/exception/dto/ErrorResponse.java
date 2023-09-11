package com.ssafy.mini.global.exception.dto;

import com.ssafy.mini.global.exception.ErrorCode;
import io.swagger.models.Response;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponse {
    private final String message;

    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .message(errorCode.getDetail())
                        .build());
    }

}
