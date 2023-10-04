package com.ssafy.mini.domain.job.service;

import com.ssafy.mini.domain.job.dto.request.*;
import com.ssafy.mini.domain.job.dto.response.JobDetailResponseDTO;
import com.ssafy.mini.domain.job.dto.response.JobListResponseDTO;

import java.util.List;

public interface JobService {
    void register(String memberId, JobRegisterRequestDTO jobRegisterRequestDTO);

    void apply(String memberId, JobApplyRequest jobApplyRequest);

    void approve(String memberId, JobApproveRequestDTO jobApproveRequestDTO);

    List<JobListResponseDTO> getJobList(String memberId);

    void decline(String memberId, JobDeclineRequestDTO jobDeclineRequestDTO);

    void fire(String memberId, JobFireRequestDTO jobFireRequestDTO);

    JobDetailResponseDTO getJobDetail(String memberId, String jobName);

    void delete(String memberId, JobDeleteRequestDTO jobDeleteRequestDTO);
}
