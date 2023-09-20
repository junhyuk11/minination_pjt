package com.ssafy.mini.domain.corporation.service;

import com.ssafy.mini.domain.corporation.dto.request.CorporationRegisterRequest;
import com.ssafy.mini.domain.corporation.entity.Corporation;
import com.ssafy.mini.domain.corporation.mapper.CorporationMapper;
import com.ssafy.mini.domain.corporation.repository.CorporationRepository;
import com.ssafy.mini.global.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class CorporationServiceImpl implements CorporationService {

    private final CorporationRepository corporationRepository;
    private final CorporationMapper corporationMapper;

    private final S3Service s3Service;

    @Override
    public void register(CorporationRegisterRequest corporationRegisterRequest, MultipartFile logo, MultipartFile profile) {
        log.info("Service Layer: register() 진입");
        Corporation corporation = corporationMapper.corporationRegisterRequestToCorporation(corporationRegisterRequest);

        // 이미지
        String logoUrl = s3Service.upload(logo);
        String profileUrl = s3Service.upload(profile);

        corporation.setImageUrls(logoUrl, profileUrl);

        corporationRepository.save(corporation);
    }
}
