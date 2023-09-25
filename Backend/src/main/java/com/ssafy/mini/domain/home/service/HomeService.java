package com.ssafy.mini.domain.home.service;

import com.ssafy.mini.domain.home.dto.response.CitizenResponse;
import com.ssafy.mini.domain.home.dto.response.HomeInfoResponse;

public interface HomeService {
    HomeInfoResponse info(String memberId);

    CitizenResponse listCitizen(String memberId);
}
