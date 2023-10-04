package com.ssafy.mini.domain.job.service;

import com.ssafy.mini.domain.job.dto.request.*;
import com.ssafy.mini.domain.job.dto.response.JobDetailResponseDTO;
import com.ssafy.mini.domain.job.dto.response.JobListResponseDTO;

import java.util.List;

public interface JobService {
    void register(String memberId, JobRegisterRequest jobRegisterRequest);

    void apply(String memberId, JobApplyRequest jobApplyRequest);

    void approve(String memberId, JobApproveRequest jobApproveRequest);

    List<JobListResponseDTO> getJobList(String memberId);

    void decline(String memberId, JobDeclineRequest jobDeclineRequest);

    void fire(String memberId, JobFireRequest jobFireRequest);

    JobDetailResponseDTO getJobDetail(String memberId, String jobName);

    void delete(String memberId, JobDeleteRequest jobDeleteRequest);
}
