package com.ssafy.mini.domain.corporation.service;

import com.ssafy.mini.domain.corporation.dto.request.CorporationRegisterRequest;
import org.springframework.web.multipart.MultipartFile;

public interface CorporationService {

    void register(CorporationRegisterRequest corporationRegisterRequest, MultipartFile logo, MultipartFile profile);

}
