package com.ssafy.mini.domain.stockholding.mapper;

import com.ssafy.mini.domain.stockholding.dto.response.PortfolioResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StockholdingMapper {

    StockholdingMapper INSTANCE = Mappers.getMapper(StockholdingMapper.class);

}
