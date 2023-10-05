package com.ssafy.mini.global.infra.s3;

import com.ssafy.mini.global.response.EnvelopeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public EnvelopeResponse upload(
            @RequestParam("file") MultipartFile file
    ) {
        s3Service.upload(file);
        return EnvelopeResponse.<String>builder()
                .build();
    }
}
