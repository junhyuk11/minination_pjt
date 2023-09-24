package com.ssafy.mini.domain.account.entity;

import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.global.db.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "account_detail")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountDetail extends BaseEntity {

    @Id
    @Column(name = "acct_det_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer acctDetSeq;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acct_seq")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acct_det_org")
    private Master organization; // 입출금처

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acct_det_cat")
    private Master category; // 입출금 카테고리

    /**
     * D: 입금
     * W: 출금
     */
    @Column(name = "acct_det_tp")
    private Character acctDetailType; // 거래 유형

    @Column(name = "acct_det_amt")
    private Integer amount; // 거래 금액

    @Column(name = "acct_det_bal")
    private Integer balance; // 거래 후 잔액

    @Column(name = "acct_det_dt")
    private LocalDateTime date; // 거래 일시

    @Builder
    public AccountDetail(Account account, Master organization, Master category, Character acctDetailType, Integer amount, Integer balance, LocalDateTime date) {
        this.account = account;
        this.organization = organization;
        this.category = category;
        this.acctDetailType = acctDetailType;
        this.amount = amount;
        this.balance = balance;
        this.date = date;
    }
}
