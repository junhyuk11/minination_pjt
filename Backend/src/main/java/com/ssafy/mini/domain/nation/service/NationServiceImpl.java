package com.ssafy.mini.domain.nation.service;

import com.ssafy.mini.domain.flag.entity.Flag;
import com.ssafy.mini.domain.flag.repository.FlagRepository;
import com.ssafy.mini.domain.flag.service.FlagService;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.nation.dto.request.NationCreateRequest;
import com.ssafy.mini.domain.nation.dto.response.FlagListResponse;
import com.ssafy.mini.domain.nation.entity.Nation;
import com.ssafy.mini.domain.nation.mapper.NationMapper;
import com.ssafy.mini.domain.nation.repository.NationRepository;
import com.ssafy.mini.domain.tax.entity.Tax;
import com.ssafy.mini.domain.tax.repository.TaxRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NationServiceImpl implements NationService {

    private final NationRepository nationRepository;
    private final TaxRepository taxRepository;
    private final MasterRepository masterRepository;
    private final MemberRepository memberRepository;
    private final FlagRepository flagRepository;

    private final FlagService flagService;

    private final NationMapper nationMapper;

    @Override
    public void create(String memberId, NationCreateRequest nationCreateRequest) {
        log.info("Nation Service Layer::Create() called");

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        String memberType = member.getMemType().getExpression();

        log.info("memberType: " + member.getMemType());
        // 선생님이 아닌데 국가를 생성 하려고 할 때 예외 처리
        if (!memberType.equals("TC")) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
        }

        // 이미 생성한 국가가 있는데 생성을 요청했을 때 예외 처리
        if(member.getIsoSeq() != null) {
            throw new MNException(ErrorCode.DUPLICATED_CREATE_NATION);
        }

        // 국기 url로 국기 객체 가져오기
        log.info("flagImageUrl: " + nationCreateRequest.getFlagImageUrl());
        Flag flag = flagService.getFlag(nationCreateRequest.getFlagImageUrl());
        log.info("flag: " + flag.getFlagSeq());
        Nation nation = nationMapper.nationCreateRequestToNation(nationCreateRequest);

        // 국기 저장
        nation.setFlag(flag);
        // 선생님 이름 저장
        nation.setTeacherName(memberId);

        nation = nationRepository.save(nation);

        // 국가의 세금 정보 저장
        Tax incomeTax = Tax.builder()
                .nation(nation)
                .taxType(masterRepository.findById("TAX01")
                        .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE)))
                .taxRate(nationCreateRequest.getIncomeTax())
                .build();

        Tax vat = Tax.builder()
                .nation(nation)
                .taxType(masterRepository.findById("TAX02")
                        .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE)))
                .taxRate(nationCreateRequest.getVat())
                .build();

        taxRepository.save(incomeTax);
        taxRepository.save(vat);

        String nationName = nationCreateRequest.getNationName();

        // 선생님도 국가 가입
        join(memberId, nationName);
    }

    @Override
    public void search(String nationName) {
        log.info("Nation Service Layer::search() called");

        nationRepository.findByIsoName(nationName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_NATION));

    }

    @Override
    public void join(String memberId, String nationName) {

        Nation nation = nationRepository.findByIsoName(nationName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_NATION));

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 이미 가입한 국가인지 확인
        if(member.getIsoSeq() != null) {
            throw new MNException(ErrorCode.DUPLICATED_JOIN_NATION);
        }

        member.setIsoSeq(nation);
        memberRepository.save(member);

    }

    @Override
    public FlagListResponse flagList() {
        log.info("Nation Service Layer::flagList() called");

        List<String> flagUrlList = flagRepository.findAllFlagUrl();

        return FlagListResponse.builder()
                .flagImgUrl(flagUrlList)
                .build();
    }

    @Override
    public void checkPresident(String nationName, String presidentName) {
        log.info("Nation Service Layer::checkPresident() called");

        Nation nation = nationRepository.findByIsoName(nationName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_NATION));

        String president = nation.getTeacherName();

        if(!president.equals(presidentName)) {
            throw new MNException(ErrorCode.NOT_MATCH_PRESIDENT);
        }
    }


}
