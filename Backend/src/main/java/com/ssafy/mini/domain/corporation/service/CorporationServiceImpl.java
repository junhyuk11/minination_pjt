package com.ssafy.mini.domain.corporation.service;

import com.ssafy.mini.domain.corporation.dto.request.CorporationRegisterRequest;
import com.ssafy.mini.domain.corporation.dto.response.CorporationInfoResponse;
import com.ssafy.mini.domain.corporation.entity.Corporation;
import com.ssafy.mini.domain.corporation.mapper.CorporationMapper;
import com.ssafy.mini.domain.corporation.repository.CorporationRepository;
import com.ssafy.mini.domain.stock.service.StockService;
import com.ssafy.mini.global.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CorporationServiceImpl implements CorporationService {

    private final CorporationRepository corporationRepository;
    private final CorporationMapper corporationMapper;

    private final StockService stockService;

    private final S3Service s3Service;

    @Override
    public void register(CorporationRegisterRequest corporationRegisterRequest, MultipartFile logo, MultipartFile profile) {
        log.info("Service Layer: register() 진입");
        Corporation corporation = corporationMapper.corporationRegisterRequestToCorporation(corporationRegisterRequest);

        // 새로운 기업 정보 저장
        // 이미지
        String logoUrl = s3Service.upload(logo);
        String profileUrl = s3Service.upload(profile);

        corporation.setImageUrls(logoUrl, profileUrl);
        corporationRepository.save(corporation);

        // 해당 기업의 지난 주가 정보 수집 및 저장
        stockService.initCorpStock(corporation.getStkCd());
    }

    @Override
    public List<CorporationInfoResponse> getCorpList() {
        log.info("Service Layer: getCorpList() called");
        return corporationToCorporationInfoResponse(corporationRepository.findAll());
    }

    /**
     * Corporation -> CorporationInfoResponse
     * @param corporations 기업 정보
     * @return
     */
    private List<CorporationInfoResponse> corporationToCorporationInfoResponse(List<Corporation> corporations) {
        return corporations.stream()
                .map(corporationMapper::corporationToCorporationInfoResponse)
                .collect(Collectors.toList());
    }
}
