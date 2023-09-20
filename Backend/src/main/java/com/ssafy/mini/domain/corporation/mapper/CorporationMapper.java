package com.ssafy.mini.domain.corporation.mapper;

import com.ssafy.mini.domain.corporation.dto.request.CorporationRegisterRequest;
import com.ssafy.mini.domain.corporation.entity.Corporation;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CorporationMapper {
    CorporationMapper INSTANCE = Mappers.getMapper(CorporationMapper.class);

    Corporation corporationRegisterRequestToCorporation(CorporationRegisterRequest request);
}
