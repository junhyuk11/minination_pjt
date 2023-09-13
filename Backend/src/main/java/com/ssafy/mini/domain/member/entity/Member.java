package com.ssafy.mini.domain.member.entity;

import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.global.db.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "member")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mem_seq")
    private Integer memSeq;

    @Column(name = "mem_id", nullable = false, unique = true, length = 20)
    private String memId;

    @Column(name = "mem_pwd", nullable = false)
    private String memPwd;

    @Column(name = "mem_nm", nullable = false, length = 10)
    private String memName;

    @Builder.Default
    @Column(name = "mem_bal", nullable = false)
    private Integer memBalance = 0;

    @Column(name = "card_no", nullable = false, length = 16)
    private String cardNo;

    /**
     * MEM01: 선생님
     * MEM02: 학생
     */
    @ManyToOne
    @JoinColumn(name = "mem_tp")
    private Master memType;

    // 소속 국가 추가하기

    // 현재 직업 추가하기

}
