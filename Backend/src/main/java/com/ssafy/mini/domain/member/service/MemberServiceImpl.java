package com.ssafy.mini.domain.member.service;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.mapper.MemberMapper;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    // TODO: 비밀번호 암호화
    // TODO: 회원 타입 저장
    @Override
    public void join(MemberJoinRequest memberJoinRequest) {
        Member member = memberMapper.memberJoinRequestToMember(memberJoinRequest);


        memberRepository.save(member);
    }

}
