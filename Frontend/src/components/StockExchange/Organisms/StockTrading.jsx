import React, { useState, useEffect } from 'react';
import './StockTrading.css';
import useStockApi from '../../../api/useStockApi.jsx';

import OrderTab from '../Molecules/OrderTab.jsx';
import BuyContent from '../Molecules/BuyContent.jsx';
import SellContent from '../Molecules/SellContent.jsx';

const StockTrading = () => {
    const [selectedButton, setSelectedButton] = useState('button1'); // 초기에는 어떤 버튼도 선택되지 않았다고 가정
    const [priceList, setPriceList] = useState([]);

    const handleButtonClick = buttonName => {
        setSelectedButton(buttonName);
    };

    const getPortList = async () => {
        try {
            const response = await useStockApi.stockGetStock();
            if (response.code === 200) {
                const priceList = response.data.portfolio.map(item => ({
                    code: item.code,
                    curPrice: item.curPrice,
                }));
                setPriceList(priceList);
            } else {
                console.log(response.code);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getPortList();
    }, []);

    return (
        <div className="order-container">
            {/* Buy/Sell Selection Section */}
            <div className="order-tab-container">
                {/* 매수하기 */}
                <OrderTab
                    type="button"
                    menu="매수하기"
                    className={`stockSelectButtonStyle ${
                        selectedButton === 'button1' ? 'active' : ''
                    }`}
                    onClick={() => handleButtonClick('button1')}
                />
                {/* 매도하기 */}
                <OrderTab
                    type="button"
                    menu="매도하기"
                    className={`stockSelectButtonStyle ${
                        selectedButton === 'button2' ? 'active' : ''
                    }`}
                    onClick={() => handleButtonClick('button2')}
                />
            </div>

            {/* Buy/Sell Component */}
            <div className="buysell-container">
                {selectedButton === 'button1' && (
                    <BuyContent priceList={priceList} />
                )}
                {selectedButton === 'button2' && (
                    <SellContent priceList={priceList} />
                )}
            </div>
        </div>

        // TradingContent Section
    );
};

export default StockTrading;
