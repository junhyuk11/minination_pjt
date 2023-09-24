package com.ssafy.mini.domain.account.repository;

import com.ssafy.mini.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}
