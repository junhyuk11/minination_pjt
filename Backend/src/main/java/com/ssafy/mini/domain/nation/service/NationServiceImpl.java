package com.ssafy.mini.domain.nation.service;

import com.ssafy.mini.domain.flag.entity.Flag;
import com.ssafy.mini.domain.flag.service.FlagService;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.service.MemberService;
import com.ssafy.mini.domain.nation.dto.request.NationCreateRequest;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class NationServiceImpl implements NationService {

    private final NationRepository nationRepository;
    private final TaxRepository taxRepository;
    private final MasterRepository masterRepository;

    private final MemberService memberService;
    private final FlagService flagService;

    private final NationMapper nationMapper;

    @Override
    public void create(String memberId, NationCreateRequest nationCreateRequest) {
        log.info("Service Layer(Nation)::Create() called");

        String memberType = memberService.getMemberType(memberId);
        log.info("memberType: " + memberType);
        // 선생님만 국가 생성 가능
        if (!memberType.equals("TC")) {
            throw new MNException(ErrorCode.NO_AUTHORITY);
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
    }
}
