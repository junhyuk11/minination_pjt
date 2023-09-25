package com.ssafy.mini.domain.home.service;

import com.ssafy.mini.domain.home.dto.response.CitizenResponse;
import com.ssafy.mini.domain.home.dto.response.HomeInfoResponse;
import com.ssafy.mini.domain.home.dto.response.ProfileResponse;
import com.ssafy.mini.domain.home.dto.response.RichResponse;

public interface HomeService {
    HomeInfoResponse info(String memberId);

    CitizenResponse listCitizen(String memberId);

    RichResponse listRich(String memberId);

    ProfileResponse getProfile(String memberId);
}
