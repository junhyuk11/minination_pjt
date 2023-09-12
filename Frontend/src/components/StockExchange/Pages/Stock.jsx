import React from 'react';
import NavBar from '../../Common/Organisms/NavBar.jsx';
// MoleCules
import TickerTape from '../Molecules/TickerTape.jsx';

// Organisms
import CompanyInfo from '../Organisms/CompanyInfo.jsx';
import StockChart from '../Organisms/StockChart.jsx';
import StockPrice from '../Organisms/StockPrice.jsx';
import StockTrading from '../Organisms/StockTrading.jsx';

import './Stock.css';

const Stock = () => {
    return (
        <div>
            <NavBar username="사용자명" balance={1000} />
            <TickerTape />

            <div className="grid-container">
                <div className="company-info">
                    <div>
                        <CompanyInfo />
                    </div>
                </div>
                <div className="stock-chart">
                    <div style={{ overflowY: 'scroll', height: '50vh' }}>
                        <StockChart />
                    </div>
                </div>
                <div className="stock-price">
                    <div style={{ overflowY: 'scroll', height: '50vh' }}>
                        <StockPrice />
                    </div>
                </div>
                <div
                    className="stock-trading"
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        width: '250px',
                    }}
                >
                    <StockTrading />
                </div>
            </div>
        </div>
    );
};

export default Stock;
