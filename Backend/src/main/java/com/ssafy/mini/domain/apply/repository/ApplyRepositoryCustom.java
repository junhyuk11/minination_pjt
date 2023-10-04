package com.ssafy.mini.domain.apply.repository;

import com.ssafy.mini.domain.job.entity.Job;

import java.util.List;

public interface ApplyRepositoryCustom {

    List<String> findMemNameByJob(Job job);

}
