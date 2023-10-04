import React from 'react';
import './TickerTape.css';

const TickerTape = ({ fluctList }) => {
    if (fluctList.length < 5) {
        return null;
    }

    return (
        <div>
            <div class="ticker-tape">
                <div class="ticker">
                    <div class="ticker__item">
                        SAMSUNG 삼성전자
                        <span className="big-gap"> </span>
                        <span className="ticker__price">
                            {fluctList[1].yesterday}
                        </span>
                        <span className="big-gap"> </span>
                        <span className="ticker__changesratio">
                            {fluctList[1].fluctDay}%
                        </span>
                    </div>
                    <div class="ticker__item">
                        HYUNDAI 현대자동차
                        <span className="big-gap"> </span>
                        <span className="ticker__price">
                            {fluctList[0].yesterday}
                        </span>
                        <span className="big-gap"> </span>
                        <span className="ticker__changesratio">
                            {fluctList[0].fluctDay}%
                        </span>
                    </div>
                    <div class="ticker__item">
                        NEXON 넥슨
                        <span className="big-gap"> </span>
                        <span className="ticker__price">
                            {fluctList[3].yesterday}
                        </span>
                        <span className="big-gap"> </span>
                        <span className="ticker__changesratio">
                            {fluctList[3].fluctDay}%
                        </span>
                    </div>
                    <div class="ticker__item">
                        HYBE 하이브
                        <span className="big-gap"> </span>
                        <span className="ticker__price">
                            {fluctList[4].yesterday}
                        </span>
                        <span className="big-gap"> </span>
                        <span className="ticker__changesratio">
                            {fluctList[4].fluctDay}%
                        </span>
                    </div>
                    <div class="ticker__item">
                        KAKAO 카카오
                        <span className="big-gap"> </span>
                        <span className="ticker__price">
                            {fluctList[2].yesterday}
                        </span>
                        <span className="big-gap"> </span>
                        <span className="ticker__changesratio">
                            {fluctList[2].fluctDay}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TickerTape;
