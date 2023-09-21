package com.ssafy.mini.domain.nation.service;

import com.ssafy.mini.domain.nation.dto.request.NationCreateRequest;

public interface NationService {
    void create(String memberId, NationCreateRequest nationCreateRequest);

}
