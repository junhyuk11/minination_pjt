package com.ssafy.mini.domain.master.enums;

import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.Getter;

@Getter
public enum MemberType {

    TEACHER('T', "MEM01"),
    USER('S', "MEM02");

    private char reqType;
    private String masterCode;

    MemberType(char reqType, String masterCode) {
        this.reqType = reqType;
        this.masterCode = masterCode;
    }

    public static MemberType findByReqType(char reqType) {
        for (MemberType memberType : MemberType.values()) {
            if (memberType.getReqType() == reqType) {
                return memberType;
            }
        }
        throw new MNException(ErrorCode.NO_SUCH_MEMBER_TYPE);
    }

}
