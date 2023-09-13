package com.ssafy.mini.domain.member.service;

import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.domain.master.enums.MemberType;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.mapper.MemberMapper;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MasterRepository masterRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final MemberMapper memberMapper;

    @Override
    @Transactional
    public void join(MemberJoinRequest memberJoinRequest) {
        log.info("Service Layer::join() called");

        Member member = memberMapper.memberJoinRequestToMember(memberJoinRequest);
        member.changePwd(passwordEncoder.encode(member.getMemPwd()));

        // 회원 타입 저장
        String memCode = MemberType.findByReqType(memberJoinRequest.getType()).getMasterCode();
        Master memberMaster = masterRepository.findById(memCode).orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER_TYPE));
        member.setMemType(memberMaster);

        // 카드 번호 랜덤 생성
        member.setCardNo(generateCardNumber());

        memberRepository.save(member);
    }

    /**
     * 카드 번호 랜덤 생성
     * @return 카드 번호
     */
    private String generateCardNumber() {
        StringBuilder cardNumber = new StringBuilder();
        Random rnd = new Random();

        for (int i = 0; i < 16; ++i) {
            cardNumber.append(rnd.nextInt(10));
        }
        return cardNumber.toString();
    }

}
