package com.ssafy.mini.domain.stockholding.service;

import com.ssafy.mini.domain.account.entity.Account;
import com.ssafy.mini.domain.account.service.AccountService;
import com.ssafy.mini.domain.member.entity.Member;
import com.ssafy.mini.domain.member.repository.MemberRepository;
import com.ssafy.mini.domain.stockholding.dto.request.TradeStockRequest;
import com.ssafy.mini.domain.stockholding.dto.response.MyStockInfoResponse;
import com.ssafy.mini.domain.stockholding.dto.response.PortfolioDto;
import com.ssafy.mini.domain.stockholding.entity.Corporation;
import com.ssafy.mini.domain.stockholding.entity.Stockholding;
import com.ssafy.mini.domain.stockholding.repository.CorporationRepository;
import com.ssafy.mini.domain.stockholding.repository.StockRepository;
import com.ssafy.mini.domain.stockholding.repository.StockholdingRepository;
import com.ssafy.mini.global.exception.ErrorCode;
import com.ssafy.mini.global.exception.MNException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockholdingServiceImpl implements StockholdingService {

    private final AccountService accountService;

    private final StockholdingRepository stockholdingRepository;
    private final StockRepository stockRepository;
    private final CorporationRepository corporationRepository;

    private final MemberRepository memberRepository;

    private final String STOCK_EXPRESSION = "SK"; // master 테이블의 주식 코드

    @Override
    public MyStockInfoResponse getPortfolio(String memberId) {
        // 보유한 주가 정보 가져오기
        List<PortfolioDto> portfolio = stockholdingRepository.findAllByMemberId(memberId);

        // 주식 보유 자산
        int balance = 0;
        for (PortfolioDto p : portfolio) {
            p.setCurPrice(getCurrentPrice(p.getCode()));
            balance += p.getCurPrice() * p.getHoldQty();
        }

        return MyStockInfoResponse.builder()
                .balance(balance)
                .portfolio(portfolio)
                .build();
    }

    @Override
    public MyStockInfoResponse buyStockItem(String memberId, TradeStockRequest tradeStockRequest) {
        String code = tradeStockRequest.getCode();
        int amount = tradeStockRequest.getAmount();

        String corporation = corporationRepository.findById(code).get().getIncNm();

        // 주식 매수
        int curPrice = getCurrentPrice(code);
        int moneyNeed = amount * curPrice;
        Account moneyHave = accountService.getNormalAccount(memberId);

        if (moneyNeed > moneyHave.getAcctBalance()) throw new MNException(ErrorCode.NOT_ENOUGH_MONEY); // 돈이 부족한 경우
        accountService.updateAccountBalance(moneyHave, -moneyNeed, STOCK_EXPRESSION,corporation); // account table 잔액 update
        updateMemberBalance(memberId, -moneyNeed); // member table 잔액 update

        // 주식 보유 수량 변경
        Stockholding stockholding = stockholdingRepository.findByMemberIdAndCode(memberId, code).orElse(
                Stockholding.builder()
                        .member(memberRepository.findByMemId(memberId).get())
                        .corporation(corporationRepository.findById(code).get())
                        .holdQty(0)
                        .stkBuyPrice(0)
                        .build()
        );
        upateStockholding(stockholding, amount, curPrice);

        return getPortfolio(memberId);
    }

    @Override
    public MyStockInfoResponse sellStockItem(String memberId, TradeStockRequest tradeStockRequest) {
        String code = tradeStockRequest.getCode();
        int amount = tradeStockRequest.getAmount();

        String corporation = corporationRepository.findById(code).get().getIncNm();
        Stockholding stockholding = stockholdingRepository.findByMemberIdAndCode(memberId, code)
                .orElseThrow(() -> new MNException(ErrorCode.NOT_ENOUGH_STOCK)); // 보유 주식 가져오기

        // 주식 매도
        int curPrice = getCurrentPrice(code);
        int moneyNeed = amount * curPrice;
        Account moneyHave = accountService.getNormalAccount(memberId);

        // 보유 주식보다 많이 팔려는 경우
        if (stockholding.getHoldQty() < amount) throw new MNException(ErrorCode.NOT_ENOUGH_STOCK);

        accountService.updateAccountBalance(moneyHave, moneyNeed, STOCK_EXPRESSION,corporation); // account table 잔액 update
        updateMemberBalance(memberId, moneyNeed); // member table 잔액 update
        upateStockholding(stockholding, -amount, -curPrice); // 주식 보유 수량 변경

        return getPortfolio(memberId);
    }

    /**
     * 회원 가입 시 보유한 종목을 모두 0으로 설정
     * 포트폴리오 조회 시 보유하지 않은 주식 종목에 대해선 0으로 보내달라는 요청이 있어서 추가
     * @param member
     */
    public void setInitStockholding(Member member) {
        List<Corporation> corps = corporationRepository.findAll(); // 모든 주식 종목
        List<Stockholding> newStockholdings = new ArrayList<>();

        for (Corporation corp: corps) {
            newStockholdings.add(
                    Stockholding.builder()
                            .member(member)
                            .corporation(corp)
                            .holdQty(0)
                            .stkBuyPrice(0)
                            .build()
            );
        }
        stockholdingRepository.saveAll(newStockholdings);
    }

    /**
     * 현재 주식 가치 가져오기
     * @param code 종목 코드
     * @return 현재 가치
     */
    private int getCurrentPrice(String code) {
        return stockRepository.getstkPriceByStkCd(code);
    }

    /**
     * 보유 주 수 및 구매 가격 변경
     * @param stockholding 보유 주식
     * @param amount 주 수
     * @param curPrice 현재 가격
     */
    private void upateStockholding(Stockholding stockholding, int amount, int curPrice) {
        stockholding.updateHoldQty(amount); // 보유 주 수 변경
        stockholding.updateStkBuyPrice(amount * curPrice); // 구매 가격 변경
        stockholdingRepository.save(stockholding);
    }

    /**
     * member table 잔액 변경
     * @param memberId 회원 아이디
     * @param amount 변경할 금액
     */
    private void updateMemberBalance(String memberId, int amount) {
        Member member = memberRepository.findByMemId(memberId).get(); // member table 잔액 update
        member.updateMembalance(amount);
        memberRepository.save(member);
    }
}
