import React, { useState, useEffect } from 'react';
import useStockApi from '../../../api/useStockApi.jsx';

// Common
import NavBar from '../../Common/Organisms/NavBar.jsx';
import './Stock.css';

// Atoms
import TabButton from '../Atoms/TabButton.jsx';

// MoleCules
import TickerTape from '../Molecules/TickerTape.jsx';
import StockChart from '../Molecules/StockChart.jsx';

// Organisms
import CompanyContent from '../Organisms/CompanyContent.jsx';
import StockTrading from '../Organisms/StockTrading.jsx';
import PortFolio from '../Organisms/PortFolio.jsx';

// Images
import samsungLogo from '../../../assets/images/samsung-logo.png';
import hyundaiLogo from '../../../assets/images/hyundai-logo.png';
import nexonLogo from '../../../assets/images/nexon-logo.png';
import hybeLogo from '../../../assets/images/hybe-logo.png';
import kakaoLogo from '../../../assets/images/kakao-logo.png';

const Stock = () => {
    const [selectedButton, setSelectedButton] = useState('button1'); // 초기에는 어떤 버튼도 선택되지 않았다고 가정
    const [stockList, setStockList] = useState([]);

    const handleButtonClick = buttonName => {
        setSelectedButton(buttonName);
    };

    const getStockList = async () => {
        try {
            const response = await useStockApi.stockGetList();
            console.log('보냈죠?', response);
            if (response.code === 200) {
                setStockList(response.data);
                console.log(stockList);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // navigateToLogin();
        }
    };

    useEffect(() => {
        getStockList();
    }, []);

    return (
        <div className="section-master">
            <NavBar username="휘진" totalBalancebalance={1000} />
            <TickerTape
                fluctList={
                    stockList &&
                    stockList.map(item => ({
                        yesterday: item.yesterday,
                        fluctDay: item.fluctDay,
                    }))
                }
            />

            <div className="section-container">
                {/* Comapny-Info-Section */}
                <div className="tab-section">
                    {/* 삼성전자 */}
                    <TabButton
                        type="button"
                        imgsrc={samsungLogo}
                        className={`stockSelectButtonStyle ${
                            selectedButton === 'button1' ? 'active' : ''
                        }`}
                        onClick={() => handleButtonClick('button1')}
                    />
                    {/* 현대자동차 */}
                    <TabButton
                        type="button"
                        imgsrc={hyundaiLogo}
                        className={`stockSelectButtonStyle ${
                            selectedButton === 'button2' ? 'active' : ''
                        }`}
                        onClick={() => handleButtonClick('button2')}
                    />
                    {/* 넥슨 */}
                    <TabButton
                        type="button"
                        imgsrc={nexonLogo}
                        className={`stockSelectButtonStyle ${
                            selectedButton === 'button3' ? 'active' : ''
                        }`}
                        onClick={() => handleButtonClick('button3')}
                    />
                    {/* 하이브 */}
                    <TabButton
                        type="button"
                        imgsrc={hybeLogo}
                        className={`stockSelectButtonStyle ${
                            selectedButton === 'button4' ? 'active' : ''
                        }`}
                        onClick={() => handleButtonClick('button4')}
                    />
                    {/* 카카오 */}
                    <TabButton
                        type="button"
                        imgsrc={kakaoLogo}
                        className={`stockSelectButtonStyle ${
                            selectedButton === 'button5' ? 'active' : ''
                        }`}
                        onClick={() => handleButtonClick('button5')}
                    />
                </div>
                {/* CompanyContent Section */}
                <div className="company-content-section">
                    {selectedButton === 'button1' &&
                        stockList.length > 1 &&
                        stockList[1].stock && (
                            <>
                                <CompanyContent info={stockList[1]} />
                                <StockChart data={stockList[1].stock} />
                            </>
                        )}
                    {selectedButton === 'button2' &&
                        stockList.length > 0 &&
                        stockList[0].stock && (
                            <>
                                <CompanyContent info={stockList[0]} />
                                <StockChart data={stockList[0].stock} />
                            </>
                        )}
                    {selectedButton === 'button3' &&
                        stockList.length > 3 &&
                        stockList[3].stock && (
                            <>
                                <CompanyContent info={stockList[3]} />
                                <StockChart data={stockList[3].stock} />
                            </>
                        )}
                    {selectedButton === 'button4' &&
                        stockList.length > 4 &&
                        stockList[4].stock && (
                            <>
                                <CompanyContent info={stockList[4]} />
                                <StockChart data={stockList[4].stock} />
                            </>
                        )}
                    {selectedButton === 'button5' &&
                        stockList.length > 2 &&
                        stockList[2].stock && (
                            <>
                                <CompanyContent info={stockList[2]} />
                                <StockChart data={stockList[2].stock} />
                            </>
                        )}
                </div>
                {/* Stock-Trading-Section */}
                <div className="stock-trading-section">
                    <PortFolio />
                    <StockTrading />
                </div>
            </div>
        </div>
    );
};

export default Stock;
