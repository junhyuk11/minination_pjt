package com.ssafy.mini.domain.member.mapper;

import com.ssafy.mini.domain.member.dto.request.MemberJoinRequest;
import com.ssafy.mini.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    @Mapping(source = "id", target = "memId")
    @Mapping(source = "password", target = "memPwd")
    @Mapping(source = "name", target = "memName")
//    @Mapping(source = "type", target = "memType")
    Member memberJoinRequestToMember(MemberJoinRequest request);


}
