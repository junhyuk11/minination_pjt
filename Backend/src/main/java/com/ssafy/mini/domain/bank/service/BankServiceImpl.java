package com.ssafy.mini.domain.bank.service;

import com.ssafy.mini.domain.account.entity.Account;
import com.ssafy.mini.domain.account.entity.AccountDetail;
import com.ssafy.mini.domain.account.repository.AccountDetailRepository;
import com.ssafy.mini.domain.account.repository.AccountRepository;
import com.ssafy.mini.domain.account.service.AccountService;
import com.ssafy.mini.domain.asset.entity.Asset;
import com.ssafy.mini.domain.asset.repository.AssetRepository;
import com.ssafy.mini.domain.bank.dto.request.BankSubscribeRequest;
import com.ssafy.mini.domain.bank.dto.request.BankTerminateRequest;
import com.ssafy.mini.domain.bank.dto.response.*;
import com.ssafy.mini.domain.bank.entity.Bank;
import com.ssafy.mini.domain.bank.repository.BankRepository;
import com.ssafy.mini.domain.master.entity.Master;
import com.ssafy.mini.domain.master.repository.MasterRepository;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.member.service.MemberService;
import com.ssafy.mini.domain.stockholding.service.StockholdingService;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final AssetRepository assetRepository;
    private final AccountDetailRepository accountDetailRepository;

    private final StockholdingService stockholdingService;
    private final MemberService memberService;
    private final AccountService accountService;

    @Override
    public BankInfoResponse info() {
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

        return BankInfoResponse.builder()
                .deposit(depositList)
                .saving(savingList)
                .build();
    }

    @Override
    public BankSubscribeResponse subscribe(String memberId, BankSubscribeRequest bankSubscribeRequest) {
        // member 확인
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 가입 상품 정보 확인
        String bankType = bankSubscribeRequest.getType();
        byte period = bankSubscribeRequest.getTerm();
        int amount = bankSubscribeRequest.getAmount();

        // 사용자의 일반 계좌 가져오기
        Account normalAccount = accountRepository.getMoneyToUse(memberId);

        String bankExpression = bankType.substring(0, 1) + period;

        Master bankCode = masterRepository.findByExpression(bankExpression)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_BANK));

        // 같은 상품에 이미 가입한 경우 예외 처리
        Account sameAccount = accountRepository.findByMemberAndBankCode(member, bankCode);
        if (sameAccount != null)
            throw new MNException(ErrorCode.ALREADY_SUBSCRIBED);

        Bank bankProduct = bankRepository.findByBankCd(bankCode)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_BANK));

        // 날짜 확인
        LocalDateTime now = LocalDateTime.now();

        int acctSaving, expAmount;
        byte rate = bankProduct.getRate();

        log.debug("rate: " + rate);

        // 계좌 타입
        String accountType = bankCode.getParentCode().getExpression();
        String day = now.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.US).toUpperCase(Locale.ROOT);

        // 정기 예금이면
        if (accountType.equals("DP")) {
            // Saving에 쓰레기 값(9999) 넣고 예상 만기 수령액 계산
            acctSaving = 9999;
            expAmount = amount * (100 + rate) / 100;
            day = "NON";
        } else {
            acctSaving = bankSubscribeRequest.getAmount();
            expAmount = amount * period * 4 * (100 + rate) / 100;
        }

        // 일반 잔고 잔액 차감
        transfer(amount, normalAccount);

        // 계좌 내역에 등록
        accountDetailRepository.save(AccountDetail.builder()
                .account(normalAccount)
                .category(bankCode.getParentCode())
                .organization("은행")
                .acctDetailType('W') // D : 입금, W: 출금
                .amount(-amount)
                .balance(normalAccount.getAcctBalance())
                .date(now)
                .build()
        );

        // 예적금 계좌 개설
        Account newAccount = Account.builder()
                .member(member)
                .bankCode(bankCode)
                .acctBalance(amount)
                .acctStartDate(Timestamp.valueOf(now))
                .acctExpireDate(Timestamp.valueOf(now.plusWeeks(period * 4)))
                .acctDay(day)
                .acctSaving(acctSaving)
                .expAmount(expAmount)
                .build();

        accountRepository.save(newAccount);

        return BankSubscribeResponse
                .builder()
                .type(bankType)
                .category(bankCode.getParentCode().getCodeName())
                .start(newAccount.getAcctStartDate().toString().substring(0, 10))
                .end(newAccount.getAcctExpireDate().toString().substring(0, 10))
                .principal(newAccount.getAcctBalance())
                .estimation(newAccount.getExpAmount())
                .build();
    }

    @Override
    public BankTerminateResponse terminate(String memberId, BankTerminateRequest bankTerminateRequest) {
        // 사용자 조회
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 해지 상품 잔액을 넣을 일반 계좌 코드 조회
        Master naAccountMaster = masterRepository.findByCode("BNT03")
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE));

        log.debug("naAccountMaster: " + naAccountMaster.getCode());

        // 해지할 상품 코드 조회
        Master bankAccountMaster = masterRepository.findByExpression(bankTerminateRequest.getType().substring(0, 1)
                        + bankTerminateRequest.getTerm())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE));

        log.debug("bankAccountMaster: " + bankAccountMaster.getCode());

        // 일반 계좌, 해지할 상품 계좌 조회
        Account normalAccount, bankAccount;
        if (accountRepository.findByMemberAndBankCode(member, naAccountMaster) != null)
            normalAccount = accountRepository.findByMemberAndBankCode(member, naAccountMaster);
        else
            throw new MNException(ErrorCode.NO_SUCH_ACCT);
        if (accountRepository.findByMemberAndBankCode(member, bankAccountMaster) != null)
            bankAccount = accountRepository.findByMemberAndBankCode(member, bankAccountMaster);
        else
            throw new MNException(ErrorCode.NO_SUCH_ACCT);

        // 일반 계좌에 잔액 옮기기
        normalAccount.updateAcctBalance(bankAccount.getAcctBalance());

        String category = bankAccount.getBankCode().getParentCode().getCodeName();
        String start = bankAccount.getAcctStartDate().toString().substring(0, 10);
        String end = bankAccount.getAcctExpireDate().toString().substring(0, 10);
        int balance = bankAccount.getAcctBalance();
        int estimation = bankAccount.getExpAmount();

        // 해지할 상품 계좌 삭제
        accountRepository.delete(bankAccount);

        return BankTerminateResponse.builder()
                .type(bankTerminateRequest.getType())
                .category(category)
                .start(start)
                .end(end)
                .balance(balance)
                .estimation(estimation)
                .build();
    }

    @Override
    public BankMyInfoResponse myAsset(String memberId) {
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        AssetDto myAsset = getAsset(member);

        // cardNo
        String cardNo = member.getCardNo();

        // flow
        List<FlowDto> flow = getFlow(member);

        // detail
        List<DetailDto> detail = getDetailList(member);

        // account
        List<AccountDto> account = getAccountList(member);

        return BankMyInfoResponse.builder()
                .cardNo(cardNo)
                .asset(myAsset)
                .flow(flow)
                .detail(detail)
                .account(account)
                .build();
    }

    private void transfer(int amount, Account account) {
        // 송금할 잔액이 있는지 확인
        if (account.getAcctBalance() < amount)
            throw new MNException(ErrorCode.NOT_ENOUGH_BALANCE);

        // 잔고 차감 및 반영
        account.updateAcctBalance(-amount);
        accountRepository.save(account);

        memberService.updateBalance(account.getMember().getMemId(), -amount);
    }

    private AssetDto getAsset(Member member) {
        // Asset : cash : 일반 계좌 잔액
        int cash = accountRepository.getMoneyToUse(member.getMemId()).getAcctBalance();

        // Asset : stock : 주식 금액
        int stock = stockholdingService.getPortfolio(member.getMemId()).getBalance();

        // Asset : save
        // 전체 계좌 가져오기
        List<Account> accountList = accountRepository.findByMember(member);

        int save = 0;
        // 전체 계좌 잔액 더하기
        for (Account account : accountList) {
            save += account.getAcctBalance();
        }
        save -= cash;       // 일반 계좌 잔액은 빼기

        return AssetDto.builder()
                .cash(cash)
                .stock(stock)
                .save(save)
                .build();
    }

    private List<FlowDto> getFlow(Member member) {

        List<FlowDto> flowDtoList = new ArrayList<>();
        List<Asset> assetList = assetRepository.findTop30ByMemberOrderByAssetDtDesc(member);

        for (int index = assetList.size() - 1; index >= 0; index--) {
            flowDtoList.add(FlowDto.builder()
                    .time(assetList.get(index).getAssetDt().toString().substring(0, 10))
                    .asset(assetList.get(index).getAssetBalance())
                    .build());
        }

        return flowDtoList;
    }

    private List<DetailDto> getDetailList(Member member) {

        List<DetailDto> detailDtoList = new ArrayList<>();
        List<AccountDetail> accountDetailList = accountDetailRepository.findAllByAccountOrderByDateDesc(accountRepository.getMoneyToUse(member.getMemId()));

        for (AccountDetail accountDetail : accountDetailList) {
            detailDtoList.add(DetailDto.builder()
                    .org(accountDetail.getOrganization())
                    .category(accountDetail.getCategory().getCodeName())
                    .amount(accountDetail.getAmount())
                    .balance(accountDetail.getBalance())
                    .date(accountDetail.getDate().toString().substring(0, 10))
                    .build());
        }

        return detailDtoList;

    }

    private List<AccountDto> getAccountList(Member member) {
        List<AccountDto> accountDtoList = new ArrayList<>();
        List<Account> accountList = accountRepository.findByMember(member);

        log.debug("accountList: {}", accountList.toString());

        for (Account account : accountList) {
            accountDtoList.add(AccountDto.builder()
                    .type(account.getBankCode().getCodeName())
                    .start(account.getAcctStartDate().toString().substring(0, 10))
                    .end(account.getAcctExpireDate().toString().substring(0, 10))
                    .principal(account.getAcctBalance())
                    .estimation(account.getExpAmount() == 9999 ? 0 : account.getExpAmount())
                    .build());
        }

        return accountDtoList;
    }

    @Transactional
    @Scheduled(cron = "0 0 03 * * ?")
    public void terminateAtMaturity() {
        List<Account> accountList = accountRepository.findAll();

        for (Account account : accountList) {
            Master bankCode = account.getBankCode();
            if (bankCode.getCode().equals("BNT03"))   // 일반 계좌면 넘기기
                continue;

            if (account.getAcctExpireDate().before(Timestamp.valueOf(LocalDateTime.now()))) {     // 만기일이 지났으면
                log.debug("bankCode: {}", bankCode.getCodeName());
                int rate = bankRepository.findByBankCd(bankCode).orElseThrow().getRate();  // 이율
                int amount = account.getAcctBalance() * (100 + rate) / 100;     // 해지 금액
                // 만기일이 지난 계좌의 잔액을 일반 계좌로 이동
                Account normalAccount = accountRepository.getMoneyToUse(account.getMember().getMemId());
                accountService.updateAccountBalance(normalAccount, amount, "TM", "은행");
                // 만기일이 지난 계좌 삭제
                accountRepository.delete(account);
            }
        }
    }

    @Transactional
    @Scheduled(cron = "0 00 04 * * ?")
    public void periodicTransfer(){
        // 적금 계좌 조회
        List<Account> accountList = accountRepository.findSavingAccount();
        String today = LocalDateTime.now().getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.US).toUpperCase(Locale.ROOT);

        for(Account savingAcct : accountList){
            // 오늘이 자동 이체일이 아닌 계좌면 skip
            if(!savingAcct.getAcctDay().equals(today))
                continue;

            Account normalAccount = accountRepository.getMoneyToUse(savingAcct.getMember().getMemId());
            // 일반 계좌 잔액이 이체할 적금 금액보다 작으면
            if(normalAccount.getAcctBalance() < savingAcct.getAcctSaving())
                continue;
            // 적금 계좌의 적금 금액을 일반 계좌에서 빼기
            accountService.updateAccountBalance(normalAccount, -savingAcct.getAcctSaving(), "AT", "은행");
            // 적금 계좌의 적금 금액을 적금 계좌에 추가
            accountService.updateAccountBalance(savingAcct, savingAcct.getAcctSaving(), "AT", "은행");
        }
    }

    @Transactional
    @Scheduled(cron = "0 0 05 * * ?")
    public void weeklyPay(){
        List<Member> memberList = memberRepository.findAll();
        for (Member member : memberList) {
            // 무직이 아니면
            if(member.getJobSeq() != null){
                // 일주일 급여
                int pay = member.getJobSeq().getJobPay() * 10000;
                // 일주일 급여를 일반 계좌에 추가
                accountService.updateAccountBalance(accountRepository.getMoneyToUse(member.getMemId()), pay, "PY", "급여");
                // 회원 계좌 잔액 업데이트
                member.updateMembalance(pay);
                memberRepository.save(member);
            }
        }

    }
}
