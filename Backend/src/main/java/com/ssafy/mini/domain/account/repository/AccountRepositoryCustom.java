package com.ssafy.mini.domain.account.repository;

import com.ssafy.mini.domain.account.entity.Account;

public interface AccountRepositoryCustom {

    Account getMoneyToUse(String memberId);

}
