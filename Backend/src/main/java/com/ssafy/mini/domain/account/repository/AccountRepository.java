package com.ssafy.mini.domain.account.repository;

import com.ssafy.mini.domain.account.entity.Account;
import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<Account, Integer>, AccountRepositoryCustom {

    /**
     * 현재 사용 가능한 금액을 조회한다.
     * @param memberId 회원 아이디
     * @return 유동 자산
     */
    Account getMoneyToUse(String memberId);

    @Query("select a from Account a where a.member = ?1 and a.bankCode = ?2")
    Account findByMemSeqAndBankCd(Member member, Master bankCode);
}
