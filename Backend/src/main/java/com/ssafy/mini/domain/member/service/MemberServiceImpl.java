package com.ssafy.mini.domain.member.service;

import com.ssafy.mini.domain.account.entity.Account;
import com.ssafy.mini.domain.account.repository.AccountRepository;
import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.mini.domain.member.dto.response.MemberTokenResponse;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.mapper.MemberMapper;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.nation.entity.Nation;
import com.ssafy.mini.domain.stockholding.service.StockholdingService;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import com.ssafy.mini.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MasterRepository masterRepository;
    private final AccountRepository accountRepository;
    private final StockholdingService stockholdingService;

    private final MemberMapper memberMapper;
    private final JwtProvider jwtProvider;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final Random rnd = new Random();

    @Override
    @Transactional
    public MemberTokenResponse join(MemberJoinRequest memberJoinRequest) {
        Member member = memberMapper.memberJoinRequestToMember(memberJoinRequest);

        idCheck(member.getMemId()); // 아이디 중복 검사
        member.changePwd(encodePassword(member.getMemPwd())); // 비밀번호 암호화

        // 회원 타입 저장
        String memberCode = masterRepository.findCodeByExpression(memberJoinRequest.getType());
        member.setMemType(masterRepository.findById(memberCode)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE)));

        member.setCardNo(generateCardNumber()); // 카드 번호 랜덤 생성
        memberRepository.save(member);

        // 일반 통장 개설
        Master master = masterRepository.findById("BNT03")
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE));

        // 보유 주식 0으로 설정
        stockholdingService.setInitStockholding(member);

        Account account = Account.builder()
                .member(member)
                .bankCode(master)
                .acctBalance(0)
                .acctStartDate(new Date())
                .acctExpireDate(new Date())
                .acctDay("NON")
                .acctSaving(9999)
                .expAmount(9999)
                .build();
        accountRepository.save(account);

        // 토큰 발급
        return generateToken(member);
    }

    @Override
    public void idCheck(String id) {
        if (memberRepository.existsByMemId(id)) {
            throw new MNException(ErrorCode.DUPLICATED_ID);
        }
    }

    @Override
    public MemberTokenResponse login(MemberLoginRequest memberLoginRequest) {
        Member member = memberRepository.findByMemId(memberLoginRequest.getId())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 비밀번호 일치 여부 확인
        if (!passwordEncoder.matches(memberLoginRequest.getPassword(), member.getMemPwd())) {
            throw new MNException(ErrorCode.WRONG_PASSWORD);
        }

        // 토큰 발급
        return generateToken(member);
    }

    @Override
    public void update(String memberId, String newPwd) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        member.changePwd(encodePassword(newPwd));
        memberRepository.save(member);

    }

    @Override
    public void logout(String accessToken, String memberId) {
        // 사용된 accessToken 블랙리스트에 저장
        jwtProvider.storeBlacklist(accessToken, memberId);

        // redis에 저장된 refresh token 토큰 삭제
        jwtProvider.deleteToken(memberId);
    }

    @Override
    public void delete(String accessToken, String memberId) {
        // 블랙리스트 저장 + refresh token 삭제
        logout(accessToken, memberId);

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        memberRepository.delete(member);
    }

    /**
     * 비밀번호 암호화
     *
     * @param password 비밀번호
     * @return 암호화된 비밀번호
     */
    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * 카드 번호 랜덤 생성
     *
     * @return 카드 번호
     */
    private String generateCardNumber() {
        StringBuilder cardNumber = new StringBuilder();

        for (int i = 0; i < 16; ++i) {
            cardNumber.append(rnd.nextInt(10));
        }
        return cardNumber.toString();
    }

    /**
     * 회원 가입, 로그인 시 jwt 토큰 발급
     * @param member
     * @return
     */
    private MemberTokenResponse generateToken(Member member) {
        String type = member.getMemType().getExpression();
        String nationName = member.getIsoSeq() != null ? member.getIsoSeq().getIsoName() : "";
        String accessToken = jwtProvider.generateAccessToken(member.getMemId());
        String refreshToken = jwtProvider.generateRefreshToken(member.getMemId());

        return MemberTokenResponse.builder()
                .memType(type)
                .nationName(nationName)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
    @Override
    public String getMemberType(String memberId) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        return member.getMemType().getExpression();
    }

    @Override
    public Nation getNationByMemberId(String memberId) {
        Nation nation = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER))
                .getIsoSeq();

        return nation;
    }

    @Override
    public void updateBalance(String memberId, int amount) {

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        member.updateMembalance(amount);

        memberRepository.save(member);

    }


}
