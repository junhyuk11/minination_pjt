package com.ssafy.mini.domain.corporation.mapper;

import com.ssafy.mini.domain.corporation.dto.request.CorporationRegisterRequest;
import com.ssafy.mini.domain.corporation.dto.response.CorporationInfoResponse;
import com.ssafy.mini.domain.corporation.entity.Corporation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CorporationMapper {
    CorporationMapper INSTANCE = Mappers.getMapper(CorporationMapper.class);

    Corporation corporationRegisterRequestToCorporation(CorporationRegisterRequest request);

    @Mapping(source = "stkCd", target = "code")
    @Mapping(source = "incNm", target = "name")
    @Mapping(source = "incDesc", target = "desc")
    @Mapping(source = "reportLink", target = "report")
    @Mapping(source = "productLink", target = "product")
    @Mapping(source = "incLink", target = "inc")
    CorporationInfoResponse corporationToCorporationInfoResponse(Corporation corporation);
}
