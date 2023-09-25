package com.ssafy.mini.domain.account.repository;

import com.ssafy.mini.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer>, AccountRepositoryCustom {

    /**
     * 현재 사용 가능한 금액을 조회한다.
     * @param memberId 회원 아이디
     * @return 유동 자산
     */
    Account getMoneyToUse(String memberId);

}
