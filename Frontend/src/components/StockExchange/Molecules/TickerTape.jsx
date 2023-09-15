import React from 'react';

const TickerTape = () => {
    return (
        <div>
            <div class="ticker-tape">
                <div class="ticker">
                    <div class="ticker__item">
                        SAMSUNG
                        <span className="ticker__price">345345</span>
                        <span className="ticker__flucrate">+54%</span>
                    </div>
                    <div class="ticker__item">HYUNDAI</div>
                    <div class="ticker__item">NEXON</div>
                    <div class="ticker__item">HYBE</div>
                    <div class="ticker__item">KAKAO</div>
                </div>
            </div>
        </div>
    );
};

export default TickerTape;
