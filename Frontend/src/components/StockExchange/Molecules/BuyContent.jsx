/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import './BuySell.css';
import Swal from 'sweetalert2';
import useStockApi from '../../../api/useStockApi.jsx';

import SamsungLogo from '../../../assets/images/samsung-logo.png';
import HyundaiLogo from '../../../assets/images/hyundai-logo.png';
import NexonLogo from '../../../assets/images/nexon-logo.png';
import HybeLogo from '../../../assets/images/hybe-logo.png';
import KakaoLogo from '../../../assets/images/kakao-logo.png';

const BuyContent = ({ priceList }) => {
    const [companyCode, setCompanyCode] = useState('');
    const [orderPrice, setOrderPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [orderAmount, setOrderAmount] = useState(0);

    const handleRadioButtonChange = e => {
        const companyCode = e.target.value;
        setCompanyCode(companyCode);
        setOrderPrice(
            priceList.find(stock => stock.code === companyCode)?.curPrice || 0,
        );
        setQuantity(1);
    };

    const handleQuantityChange = e => {
        const quantity = Number(e.target.value);
        setQuantity(quantity);
    };

    const handleBuyClick = () => {
        postStockBuy(companyCode, quantity);
        // Swal.fire('매수되었습니다.');
    };

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
            } else if (response.code === 406) {
                Swal.fire('잔액이 부족합니다.').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                console.log(response.code);
            }
        } catch (error) {}
    };

    useEffect(() => {
        setOrderAmount(orderPrice * quantity);
    }, [orderPrice, quantity]);

    return (
        <div className="buy-sell-content">
            {/* 주식선택 */}
            <div class="radio-inputs">
                <label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="engine"
                        value="005930"
                        onChange={handleRadioButtonChange}
                    />
                    <span className="radio-tile">
                        <span className="radio-icon" />
                        <span className="radio-label" />
                        <img
                            src={SamsungLogo}
                            alt="삼성로고"
                            className="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="engine"
                        value="005380"
                        onChange={handleRadioButtonChange}
                    />
                    <span className="radio-tile">
                        <span className="radio-icon" />
                        <span className="radio-label" />
                        <img
                            src={HyundaiLogo}
                            alt="현대로고"
                            className="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="engine"
                        value="225570"
                        onChange={handleRadioButtonChange}
                    />
                    <span className="radio-tile">
                        <span className="radio-icon" />
                        <span className="radio-label" />
                        <img
                            src={NexonLogo}
                            alt="넥슨로고"
                            className="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="engine"
                        value="352820"
                        onChange={handleRadioButtonChange}
                    />
                    <span className="radio-tile">
                        <span className="radio-icon" />
                        <span className="radio-label" />
                        <img
                            src={HybeLogo}
                            alt="하이브로고"
                            className="trading-company-logo"
                        />
                    </span>
                </label>
                <label>
                    <input
                        className="radio-input"
                        type="radio"
                        name="engine"
                        value="035720"
                        onChange={handleRadioButtonChange}
                    />
                    <span className="radio-tile">
                        <span className="radio-icon" />
                        <span className="radio-label" />
                        <img
                            src={KakaoLogo}
                            alt="카카오로고"
                            className="trading-company-logo"
                        />
                    </span>
                </label>
            </div>
            <div className="stock-price-quantity">
                <div className="calc-price">
                    <div className="calc-price-heading">주문가격</div>
                    <div className="trading-price">{orderPrice}</div>{' '}
                    {/* 주문가격 업데이트 */}
                </div>
                <span>x</span>
                <div className="input-group">
                    <label className="label">주문수량</label>
                    <input
                        type="number"
                        autoComplete="off"
                        name="Quantity"
                        id="Quantity"
                        className="input quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min={1}
                    />
                </div>
                <span>=</span>
                <div className="calc-price">
                    <div className="calc-price-heading">매매금액</div>
                    <div className="calc-price-result">{orderAmount}</div>
                </div>
            </div>
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
