package com.ssafy.mini.domain.stock.entity;

import com.ssafy.mini.domain.corporation.entity.Corporation;
import com.ssafy.mini.global.db.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stock extends BaseEntity {

    @Id
    @Column(name = "stock_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stockSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stk_cd")
    private Corporation stkCd;

    @Column(name = "stk_dt")
    private Date stkDt;

    @Column(name = "stk_price")
    private Integer stkPrice;

}
