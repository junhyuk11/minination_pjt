package com.ssafy.mini.domain.nation.service;

import com.ssafy.mini.domain.flag.entity.Flag;
import com.ssafy.mini.domain.flag.mapper.FlagMapper;
import com.ssafy.mini.domain.flag.repository.FlagRepository;
import com.ssafy.mini.domain.flag.service.FlagService;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.nation.dto.request.LawUpdateRequest;
import com.ssafy.mini.domain.nation.dto.request.NationCreateRequest;
import com.ssafy.mini.domain.nation.dto.response.AllFlagResponse;
import com.ssafy.mini.domain.nation.dto.response.FlagListResponse;
import com.ssafy.mini.domain.nation.dto.response.LawInfoResponse;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private final FlagMapper flagMapper;

    private final NationMapper nationMapper;

    @Override
    public void create(String memberId, NationCreateRequest nationCreateRequest) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        String memberType = member.getMemType().getExpression();

        log.debug("memberType: " + member.getMemType());
        // 선생님이 아닌데 국가를 생성 하려고 할 때 예외 처리
        if (!memberType.equals("TC")) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
        }

        // 이미 생성한 국가가 있는데 생성을 요청했을 때 예외 처리
        if(member.getIsoSeq() != null) {
            throw new MNException(ErrorCode.DUPLICATED_CREATE_NATION);
        }

        // 국기 url로 국기 객체 가져오기
        log.debug("flagImgUrl: " + nationCreateRequest.getFlagImgUrl());
        Flag flag = flagService.getFlag(nationCreateRequest.getFlagImgUrl());
        log.debug("flag: " + flag.getFlagSeq());
        Nation nation = nationMapper.nationCreateRequestToNation(nationCreateRequest);

        // 국기 저장
        nation.setFlag(flag);
        // 선생님 이름 저장
        nation.setTeacherName(member.getMemName());

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
        List<String> flagUrlList = flagRepository.findAllFlagUrl();

        return FlagListResponse.builder()
                .flagImgUrl(flagUrlList)
                .build();
    }

    @Override
    public List<AllFlagResponse> listAllFlags() {
        List<Flag> flagList = flagRepository.findAll();
        return flagList.stream()
                .map(flagMapper::flagToAllFlagResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void checkPresident(String nationName, String presidentName) {
        Nation nation = nationRepository.findByIsoName(nationName)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_NATION));

        String president = nation.getTeacherName();

        if(!president.equals(presidentName)) {
            throw new MNException(ErrorCode.NOT_MATCH_PRESIDENT);
        }
    }

    @Override
    public LawInfoResponse info(String memberId) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        Nation nation = member.getIsoSeq();

        String nationName = nation.getIsoName();
        String currency = nation.getIsoCurrency();
        String payday = nation.getPayday();
        int population = memberRepository.countByIsoSeq(nation);

        List<Tax> taxList = taxRepository.findByNation(nation);

        Map<String, Byte> tax = new HashMap<>();

        for(Tax t : taxList) {
            String taxType = t.getTaxType().getExpression();
            if(taxType.equals("IT")) {
                tax.put("incomeTax", t.getTaxRate());
            } else if(taxType.equals("VT")) {
                tax.put("vat", t.getTaxRate());
            }
        }

        log.debug("tax: " + tax);

        return LawInfoResponse.builder()
                .nationName(nationName)
                .currency(currency)
                .payday(payday)
                .tax(tax)
                .population(population)
                .build();
    }

    @Override
    public void updateLaw(String memberId, LawUpdateRequest lawUpdateRequest){
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 선생님 권한 체크
        if(!member.getMemType().getExpression().equals("TC")) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
        }

        // 국가 정보 수정
        Nation nation = member.getIsoSeq();
        nation.updateNation(lawUpdateRequest);
        nationRepository.save(nation);

        log.debug("incomeTax: " + lawUpdateRequest.getIncomeTax());
        log.debug("vat: " + lawUpdateRequest.getVat());

        // 세금 정보 수정
        taxRepository.saveTaxRateByIsoSeqandTaxTp(nation, masterRepository.findById("TAX01")
                        .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE)),
                lawUpdateRequest.getIncomeTax());
        taxRepository.saveTaxRateByIsoSeqandTaxTp(nation, masterRepository.findById("TAX02")
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE)), lawUpdateRequest.getVat());

    }


}
