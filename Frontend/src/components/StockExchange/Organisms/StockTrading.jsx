import React from 'react';
import './StockTrading.css';

const StockTrading = () => {
    return (
        <div className="order-container">
            <div className="order-buttons">
                <button type="button" className="order-btn">
                    매수하기
                </button>
                <button type="button" className="order-btn">
                    매도하기
                </button>
            </div>
            <div className="stock-info">
                <h2>종목명</h2>
                <div className="price">가격: $100</div>
                <div className="quantity">
                    수량: <input type="number" min="1" />
                </div>
                <div className="total-price">총 가격: $100</div>
            </div>
            <div className="order-btn-container">
                <button type="button" className="order-btn">
                    주문
                </button>
            </div>
        </div>
    );
};

export default StockTrading;
