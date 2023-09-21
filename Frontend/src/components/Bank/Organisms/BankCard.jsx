import React from 'react';
import BankChart from './BankChart.jsx';
import './BankCard.css';

const BankCard = () => {
    const countryName = '미소';
    const userName = '준혁';
    return (
        <div className="bankCardContainer">
            <div className="bankCardBlackBackground">
                <div className="bankCard">
                    <div className="bankCard__info">
                        <div className="bankCard__logo">{countryName}나라</div>
                        <div className="bankCard__chip">
                            <svg
                                class="bankCard__chip-lines"
                                role="img"
                                width="20px"
                                height="20px"
                                viewBox="0 0 100 100"
                                aria-label="Chip"
                            >
                                <g opacity="0.8">
                                    <polyline
                                        points="0,50 35,50"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="0,20 20,20 35,35"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="50,0 50,35"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="65,35 80,20 100,20"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="100,50 65,50"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="35,35 65,35 65,65 35,65 35,35"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="0,80 20,80 35,65"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="50,100 50,65"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                    <polyline
                                        points="65,65 80,80 100,80"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="2"
                                    />
                                </g>
                            </svg>
                            <div className="bankCard__chip-texture" />
                        </div>
                        <div className="bankCard__type">debit</div>
                        <div className="bankCard__number">
                            <span class="bankCard__digit-group">0123</span>
                            <span class="bankCard__digit-group">4567</span>
                            <span class="bankCard__digit-group">8901</span>
                            <span class="bankCard__digit-group">2345</span>
                        </div>
                        <div className="bankCard__exp-date">
                            <time datetime="2038-01">01/38</time>
                        </div>
                        <div
                            className="bankCard__name"
                            aria-label="Dee Stroyer"
                        >
                            {userName}
                        </div>
                        <div
                            class="card__vendor"
                            role="img"
                            aria-labelledby="bankCard-vendor"
                        >
                            <span
                                id="bankCard-vendor"
                                class="bankCard__vendor-sr"
                            >
                                Mastercard
                            </span>
                        </div>
                        <div className="bankCard__texture" />
                    </div>
                </div>
                <BankChart />
            </div>
        </div>
    );
};

export default BankCard;
