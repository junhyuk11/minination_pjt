package com.ssafy.mini.global.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class EnvelopeResponse<T> {

    @Builder.Default
    private HttpStatus code = HttpStatus.OK;

    @Builder.Default
    private String message = "success";

    private T data;

}
