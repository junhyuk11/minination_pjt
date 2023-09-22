package com.ssafy.mini.domain.nation.mapper;

import com.ssafy.mini.domain.nation.dto.request.NationCreateRequest;
import com.ssafy.mini.domain.nation.entity.Nation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface NationMapper {

    NationMapper INSTANCE = Mappers.getMapper(NationMapper.class);

    @Mapping(source = "nationName", target = "isoName")
    @Mapping(source = "currency", target = "isoCurrency")
    Nation nationCreateRequestToNation(NationCreateRequest request);



}
