import React, { useState, useEffect } from 'react';
import './PortFolio.css';
import useStockApi from '../../../api/useStockApi.jsx';

// Images
import samsungLogo from '../../../assets/images/samsung-logo.png';
import hyundaiLogo from '../../../assets/images/hyundai-logo.png';
import nexonLogo from '../../../assets/images/nexon-logo.png';
import hybeLogo from '../../../assets/images/hybe-logo.png';
import kakaoLogo from '../../../assets/images/kakao-logo.png';
import portfolioSum from '../../../assets/images/portfolio-sum.png';

function PortFolio() {
    const [portList, setPortList] = useState([]);

    //portList에 포트폴리오가 담겨있음. 
    const getPortList = async () => {
        try {
            const response = await useStockApi.stockGetStock();
            console.log('보냈죠?', response);
            if (response.code === 200) {
                console.log(response.data)
                setPortList(response.data);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // navigateToLogin();
        }
    };
    
    useEffect(() => {
        getPortList();
    }, []);

    return (
        <div className="portfolio-container">
            <div className="portfolio-item">
                <div className="portfolio-item-logo center">
                    <img
                        src={samsungLogo}
                        alt="Samsung Logo"
                        style={{
                            width: '40px',
                            borderRadius: '50%',
                            border: '1px solid white',
                        }}
                    />
                </div>
                <div className="portfolio-item-holdings center">
                    <span>10주</span>
                    <span>X</span>
                    <span>6000</span>
                </div>
                <div className="portfolio-item-value center">
                    <div>
                        <span className="gap">현재가치</span>
                        <span className="emp">10000</span>
                    </div>
                    <div>
                        <span className="gap">구매금액</span>
                        <span className="emp">10000</span>
                    </div>
                    <div>
                        <span className="gap">손익</span>
                        <span className="emp">10000</span>
                    </div>
                </div>
                <div className="porftolio-item-status center">
                    {/* status에 따라 클래스를 동적으로 추가합니다. */}
                    <div
                        className={`status-box center ${
                            status === 'positive'
                                ? 'positive-status'
                                : 'negative-status'
                        }`}
                    >
                        +15%
                    </div>
                </div>
            </div>
            <div className="portfolio-item">
                <div className="portfolio-item-logo center">
                    <img
                        src={hyundaiLogo}
                        alt="Hyundai Logo"
                        style={{
                            width: '40px',
                            borderRadius: '50%',
                            border: '1px solid white',
                        }}
                    />
                </div>
                <div className="portfolio-item-holdings center">
                    <span>10주</span>
                    <span>X</span>
                    <span>6000</span>
                </div>
                <div className="portfolio-item-value center">
                    <div>
                        <span className="gap">현재가치</span>
                        <span className="emp">10000</span>
                    </div>
                    <div>
                        <span className="gap">구매금액</span>
                        <span className="emp">10000</span>
                    </div>
                    <div>
                        <span className="gap">손익</span>
                        <span className="emp">10000</span>
                    </div>
                </div>
                <div className="porftolio-item-status center">
                    {/* status에 따라 클래스를 동적으로 추가합니다. */}
                    <div
                        className={`status-box center ${
                            status === 'positive'
                                ? 'positive-status'
                                : 'negative-status'
                        }`}
                    >
                        +15%
                    </div>
                </div>
            </div>
            <div className="portfolio-item">
                <div className="portfolio-item-logo center">
                    <img
                        src={portfolioSum}
                        alt="포트폴리오"
                        style={{
                            width: '40px',
                            borderRadius: '50%',
                            border: '1px solid white',
                        }}
                    />
                </div>
                <div className="portfolio-item-holdings center">
                    <span>10주</span>
                    <span>X</span>
                    <span>6000</span>
                </div>
                <div className="portfolio-item-value center">
                    <div>
                        <span className="gap">현재가치</span>
                        <span className="emp">10000</span>
                    </div>
                    <div>
                        <span className="gap">구매금액</span>
                        <span className="emp">10000</span>
                    </div>
                    <div>
                        <span className="gap">손익</span>
                        <span className="emp">10000</span>
                    </div>
                </div>
                <div className="porftolio-item-status center">
                    {/* status에 따라 클래스를 동적으로 추가합니다. */}
                    <div
                        className={`status-box center ${
                            status === 'positive'
                                ? 'positive-status'
                                : 'negative-status'
                        }`}
                    >
                        +15%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortFolio;
