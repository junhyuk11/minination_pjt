package com.ssafy.mini.domain.bank.service;

import com.ssafy.mini.domain.account.entity.Account;
import com.ssafy.mini.domain.account.repository.AccountRepository;
import com.ssafy.mini.domain.bank.dto.request.BankSubscribeRequestDTO;
import com.ssafy.mini.domain.bank.dto.response.BankInfoResponseDTO;
import com.ssafy.mini.domain.bank.dto.response.BankSubscribeResponseDTO;
import com.ssafy.mini.domain.bank.entity.Bank;
import com.ssafy.mini.domain.bank.repository.BankRepository;
import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {

    private final MemberRepository memberRepository;
    private final BankRepository bankRepository;
    private final AccountRepository accountRepository;
    private final MasterRepository masterRepository;

    @Override
    public BankInfoResponseDTO info() {

        log.info("Bank Service Layer:: info() called");

        List<Bank> bankList = bankRepository.findAll();

        List<Map<String, String>> depositList = new ArrayList<>();
        List<Map<String, String>> savingList = new ArrayList<>();

        for (Bank bank : bankList) {

            Map<String, String> deposit = new HashMap<>();
            Map<String, String> saving = new HashMap<>();

            String bankType = bank.getBankCd().getParentCode().getCode();
            // 해당 상품이 정기 적금이면
            if (bankType.equals("BNT01")) {
                deposit.put("term", bank.getPeriod().toString());
                deposit.put("interest", bank.getRate().toString());
                depositList.add(deposit);
            } else if (bankType.equals("BNT02")) {
                saving.put("term", bank.getPeriod().toString());
                saving.put("interest", bank.getRate().toString());
                savingList.add(saving);
            }
        }

        return BankInfoResponseDTO.builder()
                .deposit(depositList)
                .saving(savingList)
                .build();
    }

    @Override
    public BankSubscribeResponseDTO subscribe(String memberId, BankSubscribeRequestDTO bankSubscribeRequestDTO) {

        log.info("Bank Service Layer:: subscribe() called");

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        String bankType = bankSubscribeRequestDTO.getType();
        byte period = bankSubscribeRequestDTO.getTerm();
        String bankExpression = bankType.substring(0, 1) + period;

        Master bankCode = masterRepository.findByExpression(bankExpression)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_BANK)));

        // TODO: 계좌 개설

        LocalDateTime now = LocalDateTime.now();

        int acctSaving = bankSubscribeRequestDTO.getAmount();

        // 정기 예금이면 Saving에 쓰레기값(9999)을 넣는다.
        if(bankCode.getParentCode().equals("BNT02"))
            acctSaving = 9999;

//        accountRepository.save(Account.builder()
//                .member(member)
//                .bankCode(bankCode)
//                .acctStartDate(Timestamp.valueOf(now))
//                .acctExpireDate(Timestamp.valueOf(now.plusWeeks(period*4)))
//                .acctDay(now.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN).toUpperCase(Locale.ROOT))
//                .acctSaving(acctSaving)
//                .

        )


        return null;
    }
}
