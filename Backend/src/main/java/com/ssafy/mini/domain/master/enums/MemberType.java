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

    /**
     * 요청 타입으로 회원 코드 찾는다.
     * @param reqType T: Teacher, S: Student
     * @return 회원 코드
     */
    public static MemberType findByReqType(char reqType) {
        for (MemberType memberType : MemberType.values()) {
            if (memberType.getReqType() == reqType) {
                return memberType;
            }
        }
        throw new MNException(ErrorCode.NO_SUCH_MEMBER_TYPE);
    }

    /**
     * 회원 코드로 요청 타입 찾는다.
     * @param masterCode 회원 코드
     * @return T: Teacher, S: Student
     */
    public static Character findByMasterCode(String masterCode) {
        for (MemberType memberType : MemberType.values()) {
            if (memberType.getMasterCode().equals(masterCode)) {
                return memberType.getReqType();
            }
        }
        throw new MNException(ErrorCode.NO_SUCH_MEMBER_TYPE);
    }

}
