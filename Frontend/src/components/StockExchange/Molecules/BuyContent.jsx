/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './BuySell.css';
import Swal from 'sweetalert2';
import useStockApi from '../../../api/useStockApi.jsx';

import SamsungLogo from '../../../assets/images/samsung-logo.png';
import HyundaiLogo from '../../../assets/images/hyundai-logo.png';
import NexonLogo from '../../../assets/images/nexon-logo.png';
import HybeLogo from '../../../assets/images/hybe-logo.png';
import KakaoLogo from '../../../assets/images/kakao-logo.png';

const BuyContent = () => {
    const handleBuyClick = () => {
        Swal.fire('매수되었습니다.');
    };

    //클릭하면 아래 요청에 (code, amount)를 담아야 함. 주식 가격 어떻게 받아오는지 모르겠네.
    const postStockBuy = async (code, amount) => {
        try {
            const subData = { code: `${code}`, amount: `${amount}` };
            console.log('subdata', subData);
            const response = await useStockApi.stockPostBuy(subData);
            if (response.code === 200) {
                Swal.fire('매수되었습니다.').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                console.log(response.code);
            }
        } catch (error) {
            console.log(response);
        }
    };

    return (
        <div className="buy-sell-content">
            {/* 주식선택 */}
            <div class="radio-inputs">
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label" />
                        <img
                            src={SamsungLogo}
                            alt="삼성로고"
                            class="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label" />
                        <img
                            src={HyundaiLogo}
                            alt="현대로고"
                            class="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label" />
                        <img
                            src={NexonLogo}
                            alt="넥슨로고"
                            class="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label" />
                        <img
                            src={HybeLogo}
                            alt="하이브로고"
                            class="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label" />
                        <img
                            src={KakaoLogo}
                            alt="카카오로고"
                            class="trading-company-logo"
                        />
                    </span>
                </label>
            </div>
            {/* 주문가격, 주문수량 */}
            <div className="stock-price-quantity">
                <div className="calc-price">
                    <div className="calc-price-heading">주문가격</div>
                    <div className="trading-price">45</div>
                </div>
                <span>x</span>
                <div className="input-group">
                    <label className="label">주문수량</label>
                    <input
                        autoComplete="off"
                        name="Quantity"
                        id="Quantity"
                        className="input quantity"
                    />
                </div>
                <span>=</span>
                <div className="calc-price">
                    <div className="calc-price-heading">매매금액</div>
                    <div className="calc-price-result">4500</div>
                </div>
            </div>
            {/* 매도버튼 */}
            <button
                type="button"
                className="buy-sell-btn buy-btn"
                onClick={handleBuyClick}
            >
                매수하기
            </button>
        </div>
    );
};

export default BuyContent;
