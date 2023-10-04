package com.ssafy.mini.domain.bank.service;

import com.ssafy.mini.domain.bank.dto.request.BankSubscribeRequest;
import com.ssafy.mini.domain.bank.dto.request.BankTerminateRequest;
import com.ssafy.mini.domain.bank.dto.response.BankInfoResponse;
import com.ssafy.mini.domain.bank.dto.response.BankSubscribeResponse;
import com.ssafy.mini.domain.bank.dto.response.BankTerminateResponse;
import com.ssafy.mini.domain.bank.dto.response.BankMyInfoResponse;

public interface BankService {
    BankInfoResponse info();

    BankSubscribeResponse subscribe(String memberId, BankSubscribeRequest bankSubscribeRequest);

    BankTerminateResponse terminate(String memberId, BankTerminateRequest bankTerminateRequest);

    BankMyInfoResponse myAsset(String memberId);
}
