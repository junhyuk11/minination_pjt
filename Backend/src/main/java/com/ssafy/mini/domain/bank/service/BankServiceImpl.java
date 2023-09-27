package com.ssafy.mini.domain.bank.service;

import com.ssafy.mini.domain.account.entity.Account;
import com.ssafy.mini.domain.account.entity.AccountDetail;
import com.ssafy.mini.domain.account.repository.AccountDetailRepository;
import com.ssafy.mini.domain.account.repository.AccountRepository;
import com.ssafy.mini.domain.asset.entity.Asset;
import com.ssafy.mini.domain.asset.repository.AssetRepository;
import com.ssafy.mini.domain.bank.dto.request.BankSubscribeRequestDTO;
import com.ssafy.mini.domain.bank.dto.request.BankTerminateRequestDTO;
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
    private final AssetRepository assetRepository;
    private final AccountDetailRepository accountDetailRepository;

    private final StockholdingService stockholdingService;
    private final MemberService memberService;

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

        // member 확인
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 가입 상품 정보 확인
        String bankType = bankSubscribeRequestDTO.getType();
        byte period = bankSubscribeRequestDTO.getTerm();
        int amount = bankSubscribeRequestDTO.getAmount();

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

        log.info("rate: " + rate);

        // 계좌 타입
        String accountType = bankCode.getParentCode().getExpression();

        // 정기 예금이면
        if (accountType.equals("DP")) {
            // Saving에 쓰레기 값(9999) 넣고 예상 만기 수령액 계산
            acctSaving = 9999;
            expAmount = amount * (100 + rate) / 100;
        } else {
            acctSaving = bankSubscribeRequestDTO.getAmount();
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
                .acctDay(now.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.US).toUpperCase(Locale.ROOT))
                .acctSaving(acctSaving)
                .expAmount(expAmount)
                .build();

        accountRepository.save(newAccount);

        return BankSubscribeResponseDTO
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
    public BankTerminateResponseDTO terminate(String memberId, BankTerminateRequestDTO bankTerminateRequestDTO) {

        log.info("Bank Service Layer:: terminate() called");

        // 사용자 조회
        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        // 해지 상품 잔액을 넣을 일반 계좌 코드 조회
        Master naAccountMaster = masterRepository.findByCode("BNT03")
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE));

        log.info("naAccountMaster: " + naAccountMaster.getCode());

        // 해지할 상품 코드 조회
        Master bankAccountMaster = masterRepository.findByExpression(bankTerminateRequestDTO.getType().substring(0, 1)
                        + bankTerminateRequestDTO.getTerm())
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_CODE));

        log.info("bankAccountMaster: " + bankAccountMaster.getCode());

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

        return BankTerminateResponseDTO.builder()
                .type(bankTerminateRequestDTO.getType())
                .category(category)
                .start(start)
                .end(end)
                .balance(balance)
                .estimation(estimation)
                .build();
    }

    @Override
    public BankMyInfoResponseDTO myAsset(String memberId) {

        log.info("Bank Service Layer:: myAsset() called");

        Member member = memberRepository.findByMemId(memberId)
                .orElseThrow(() -> new MNException(ErrorCode.NO_SUCH_MEMBER));

        AssetDTO myAsset = getAsset(member);

        // cardNo
        String cardNo = member.getCardNo();

        // flow
        List<FlowDTO> flow = getFlow(member);

        // detail
        List<DetailDTO> detail = getDetailList(member);

        // account
        List<AccountDTO> account = getAccountList(member);

        return BankMyInfoResponseDTO.builder()
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

    private AssetDTO getAsset(Member member) {
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

        return AssetDTO.builder()
                .cash(cash)
                .stock(stock)
                .save(save)
                .build();
    }

    private List<FlowDTO> getFlow(Member member) {

        List<FlowDTO> flowDTOList = new ArrayList<>();
        List<Asset> assetList = assetRepository.findByMemberOrderByAssetDtDesc(member);

        for (Asset asset : assetList) {
            flowDTOList.add(FlowDTO.builder()
                    .date(asset.getAssetDt().toString().substring(0, 10))
                    .asset(asset.getAssetBalance())
                    .build());
        }

        return flowDTOList;
    }

    private List<DetailDTO> getDetailList(Member member) {

        List<DetailDTO> detailDTOList = new ArrayList<>();
        List<AccountDetail> accountDetailList = accountDetailRepository.findAllByAccountOrderByDateDesc(accountRepository.getMoneyToUse(member.getMemId()));

        for (AccountDetail accountDetail : accountDetailList) {
            detailDTOList.add(DetailDTO.builder()
                    .org(accountDetail.getOrganization())
                    .category(accountDetail.getCategory().getCodeName())
                    .amount(accountDetail.getAmount())
                    .balance(accountDetail.getBalance())
                    .date(accountDetail.getDate().toString().substring(0, 10))
                    .build());
        }

        return detailDTOList;

    }

    private List<AccountDTO> getAccountList(Member member){
        List<AccountDTO> accountDTOList = new ArrayList<>();
        List<Account> accountList = accountRepository.findByMember(member);

        log.info("accountList: {}" , accountList.toString());

        for(Account account : accountList){
            accountDTOList.add(AccountDTO.builder()
                    .type(account.getBankCode().getCodeName())
                    .start(account.getAcctStartDate().toString().substring(0, 10))
                    .end(account.getAcctExpireDate().toString().substring(0, 10))
                    .principal(account.getAcctBalance())
                    .estimaion(account.getExpAmount() == 9999? 0 : account.getExpAmount())
                    .build());
        }

        return accountDTOList;
    }


}
