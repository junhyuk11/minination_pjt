import React, { useState, useEffect } from 'react';
import './PortFolio.css';
import useStockApi from '../../../api/useStockApi.jsx';

// Images
import samsungLogo from '../../../assets/images/samsung-logo.png';
import hyundaiLogo from '../../../assets/images/hyundai-logo.png';
import nexonLogo from '../../../assets/images/nexon-logo.png';
import hybeLogo from '../../../assets/images/hybe-logo.png';
import kakaoLogo from '../../../assets/images/kakao-logo.png';

function PortFolio() {
    const [portList, setPortList] = useState([]);

    const getPortList = async () => {
        try {
            const response = await useStockApi.stockGetStock();
            if (response.code === 200) {
                console.log(response.data.portfolio);
                setPortList(response.data.portfolio);
            } else {
                console.log(response.code);
            }
        } catch (error) {}
    };

    const logoMap = {
        '005930': samsungLogo,
        '005380': hyundaiLogo,
        225570: nexonLogo,
        352820: hybeLogo,
        '035720': kakaoLogo,
    };

    useEffect(() => {
        getPortList();
    }, []);

    return (
        <div className="portfolio-container">
            {portList.map((stock, index) => (
                <>
                    <div className="portfolio-item" key={index}>
                        <div className="portfolio-item-logo center">
                            <img
                                src={logoMap[stock.code]}
                                alt={`${stock.name} Logo`}
                                style={{
                                    width: '40px',
                                    borderRadius: '50%',
                                    border: '1px solid white',
                                }}
                            />
                        </div>
                        <div className="portfolio-item-holdings center">
                            <span>{stock.holdQty}주</span>
                        </div>
                        <div className="portfolio-item-value center">
                            <div>
                                <span className="gap">현재가치</span>
                                <span className="emp">
                                    {stock.curTotalPrice}
                                </span>{' '}
                            </div>
                            <div>
                                <span className="gap">구매금액</span>
                                <span className="emp">
                                    {stock.buyPrice}
                                </span>{' '}
                            </div>
                            <div>
                                <span className="gap">손익</span>
                                <span className="emp">{stock.profit}</span>{' '}
                            </div>
                        </div>
                        <div className="porftolio-item-status center">
                            <div
                                className={`status-box center ${
                                    !isNaN(stock.profitRate) &&
                                    stock.profitRate >= 0
                                        ? 'positive-status'
                                        : 'negative-status'
                                }`}
                            >
                                {!isNaN(stock.profitRate)
                                    ? `${stock.profitRate}%`
                                    : `0%`}
                            </div>
                        </div>
                    </div>
                    <div className="divider"> </div>
                </>
            ))}
        </div>
    );
}

export default PortFolio;
