package com.ssafy.mini.domain.member.dto.request;

import com.ssafy.mini.domain.master.entity.Master;
import lombok.Getter;

@Getter
public class MemberJoinRequest {
    private String id;
    private String password;
    private String name;
    private String type;
}
