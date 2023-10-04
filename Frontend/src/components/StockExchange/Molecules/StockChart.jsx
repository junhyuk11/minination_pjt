import React from 'react';
import EconomyRow from '../Atoms/EconomyRow.jsx';
import HomeCard from '../Atoms/EconomyColumn.jsx';
import './StockChart.css';

const Economy = ({ data }) => {
    const contentDom = <EconomyRow data={[...data]} />;

    return (
        <div className="stockchart-container">
            <div className="stockchart-container-two">
                <HomeCard title="`     주가 추이" content={contentDom} />
            </div>
            <div className="emptybox"> </div>
        </div>
    );
};

export default Economy;
