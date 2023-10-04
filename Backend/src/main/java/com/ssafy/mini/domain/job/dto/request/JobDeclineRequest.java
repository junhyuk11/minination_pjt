package com.ssafy.mini.domain.job.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class JobDeclineRequest {
    private String jobName;
    private String applicantName;

    @Builder
    public JobDeclineRequest(String jobName, String applicantName) {
        this.jobName = jobName;
        this.applicantName = applicantName;
    }
}
