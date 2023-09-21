package com.ssafy.mini.domain.member.service;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.mini.domain.member.dto.response.MemberLoginResponse;

public interface MemberService {

    void join(MemberJoinRequest memberJoinRequest);

    void idCheck(String id);

    MemberLoginResponse login(MemberLoginRequest memberLoginRequest);

    void update(String memberId, String newPwd);

    String getMemberType(String memberId);

}
