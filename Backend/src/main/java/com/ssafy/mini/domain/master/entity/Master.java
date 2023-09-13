package com.ssafy.mini.domain.master.entity;

import javax.persistence.*;

@Entity
@Table(name = "master")
public class Master {

    @Id
    @Column(name = "code", length = 5)
    private String code;

    @Column(name = "category", length = 7)
    private String category;

    @Column(name = "code_nm", length = 10)
    private String codeName;

    @Column(name = "use_yn", length = 1)
    private String useYN;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_cd")
    private Master parentCode;
}
