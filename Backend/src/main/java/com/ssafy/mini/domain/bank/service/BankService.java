package com.ssafy.mini.domain.bank.service;

import com.ssafy.mini.domain.bank.dto.request.BankSubscribeRequestDTO;
import com.ssafy.mini.domain.bank.dto.response.BankInfoResponseDTO;
import com.ssafy.mini.domain.bank.dto.response.BankSubscribeResponseDTO;

public interface BankService {
    BankInfoResponseDTO info();

    BankSubscribeResponseDTO subscribe(String memberId, BankSubscribeRequestDTO bankSubscribeRequestDTO);
}
