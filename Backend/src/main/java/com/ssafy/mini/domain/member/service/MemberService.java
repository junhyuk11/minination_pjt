package com.ssafy.mini.domain.member.service;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.dto.request.MemberLoginRequest;

public interface MemberService {

    void join(MemberJoinRequest memberJoinRequest);

    void idCheck(String id);

}
