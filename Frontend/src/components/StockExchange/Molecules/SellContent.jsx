/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './BuySell.css';

import '../../../assets/images/samsung-logo.png';

const SellContent = () => {
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [finalPrice, setFinalPrice] = useState(null);

    const handlePriceChange = e => {
        setPrice(e.target.value);
        // eslint-disable-next-line no-use-before-define
        calculateFinalPrice(e.target.value, quantity);
    };

    const handleQuantityChange = e => {
        setQuantity(e.target.value);
        // eslint-disable-next-line no-use-before-define
        calculateFinalPrice(price, e.target.value);
    };

    // eslint-disable-next-line no-shadow
    const calculateFinalPrice = (price, quantity) => {
        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseFloat(quantity);

        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(parsedPrice) && !isNaN(parsedQuantity)) {
            const result = parsedPrice * parsedQuantity;
            setFinalPrice(result.toFixed(0));
        } else {
            setFinalPrice(null);
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
                        <span class="radio-label">삼전</span>
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label">현대</span>
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label">넥슨</span>
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label">하이브</span>
                    </span>
                </label>
                <label>
                    <input class="radio-input" type="radio" name="engine" />
                    <span class="radio-tile">
                        <span class="radio-icon" />
                        <span class="radio-label">카카오</span>
                    </span>
                </label>
            </div>
            {/* 주문가격, 주문수량 */}
            <div className="stock-price-quantity">
                <div className="input-group">
                    <label className="label">주문가격</label>
                    <input
                        autoComplete="off"
                        name="Price"
                        id="Price"
                        className="input price"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <span>x</span>
                <div className="input-group">
                    <label className="label">주문수량</label>
                    <input
                        autoComplete="off"
                        name="Quantity"
                        id="Quantity"
                        className="input quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <span>=</span>
                <div className="calc-price">
                    <div className="calc-price-heading">매매금액</div>
                    {/* 최종가격이 null 일 때는 빈 문자열 표시 */}
                    <div className="calc-price-result">
                        {finalPrice !== null ? finalPrice : ''}
                    </div>
                </div>
            </div>
            {/* 매도버튼 */}
            <button type="button" className="buy-sell-btn sell-btn">
                매도하기
            </button>
        </div>
    );
};

export default SellContent;
