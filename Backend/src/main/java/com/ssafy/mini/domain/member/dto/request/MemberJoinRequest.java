package com.ssafy.mini.domain.member.dto.request;

import lombok.Getter;

@Getter
public class MemberJoinRequest {

    private String id;
    private String password;
    private String name;
    private char type;

}
