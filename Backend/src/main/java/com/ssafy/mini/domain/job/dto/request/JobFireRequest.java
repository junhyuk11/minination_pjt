package com.ssafy.mini.domain.job.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class JobFireRequest {
    private String jobName;
    private String employeeName;

    @Builder
    public JobFireRequest(String jobName, String employeeName) {
        this.jobName = jobName;
        this.employeeName = employeeName;
    }
}
