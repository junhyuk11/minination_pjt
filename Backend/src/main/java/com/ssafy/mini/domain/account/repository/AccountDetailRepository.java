package com.ssafy.mini.domain.account.repository;

import com.ssafy.mini.domain.account.entity.AccountDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDetailRepository extends JpaRepository<AccountDetail, Integer> {
}
