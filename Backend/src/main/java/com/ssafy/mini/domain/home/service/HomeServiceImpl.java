package com.ssafy.mini.domain.home.service;

import com.ssafy.mini.domain.flag.repository.FlagRepository;
import com.ssafy.mini.domain.home.dto.response.HomeInfoResponse;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.nation.entity.Nation;
import com.ssafy.mini.domain.nation.repository.NationRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final MemberRepository memberRepository;
    private final NationRepository nationRepository;
    private final FlagRepository flagRepository;

    @Override
    public HomeInfoResponse info(String memberId) {

        log.info("Service Layer::info() called");

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        Short nationSeq = member.getIsoSeq().getIsoSeq();
        // 회원이 국가에 속하지 않은 상태일 때 예외 처리
        if(nationSeq == null)
            throw new MNException(ErrorCode.NO_NATION);

        Nation nation = nationRepository.findByIsoSeq(nationSeq)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_NATION));

        String flagUrl = flagRepository.findById(nation.getFlag().getFlagSeq())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_FLAG))
                .getFlagUrl();

        return HomeInfoResponse.builder()
                .nationName(nation.getIsoName())
                .flag(flagUrl)
                .build();
    }
}
