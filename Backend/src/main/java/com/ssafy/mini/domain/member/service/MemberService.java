package com.ssafy.mini.domain.member.service;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.mini.domain.member.dto.response.MemberMetadataResponse;
import com.ssafy.mini.domain.member.dto.response.MemberTokenResponse;
import com.ssafy.mini.domain.nation.entity.Nation;

public interface MemberService {

    MemberTokenResponse join(MemberJoinRequest memberJoinRequest);

    void idCheck(String id);

    MemberTokenResponse login(MemberLoginRequest memberLoginRequest);

    void update(String memberId, String newPwd);

    void logout(String accessToken, String memberId);

    void delete(String memberId, String accessToken);

    String getMemberType(String memberId);

    Nation getNationByMemberId(String memberId);

    void updateBalance(String memberId, int amount);

    MemberMetadataResponse getMemberMetadata(String memberId);

}
