package com.ssafy.mini.domain.tax.entity;

import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.domain.nation.entity.Nation;
import com.ssafy.mini.global.db.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity(name = "tax")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Tax extends BaseEntity {

    @Id
    @Column(name = "tax_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taxSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "iso_seq")
    private Nation nation;

    /**
     * TAX01: 소득세
     * TAX02: 부가가치세
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tax_tp")
    private Master taxType;

    @Column(name = "tax_rate", nullable = false)
    private Byte taxRate;

    @Builder
    public Tax(Nation nation, Master taxType, Byte taxRate) {
        this.nation = nation;
        this.taxType = taxType;
        this.taxRate = taxRate;
    }

    public void changeTax(Byte taxRate){
        this.taxRate = taxRate;
    }

}
