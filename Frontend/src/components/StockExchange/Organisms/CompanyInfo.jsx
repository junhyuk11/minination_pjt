import React from 'react';
import './CompanyInfo.css';
// API 불러오면 아래는 삭제
import SamsungCover from '../../../assets/images/samsung-cover.png';
import SamsungLogo from '../../../assets/images/samsung-logo.png';

const CompanyInfo = () => {
    return (
        <div>
            <div class="company-name">삼성전자</div>
            <div class="company-image-parent">
                <img
                    src={SamsungCover}
                    alt="삼성배경"
                    class="company-coverimage"
                />
                <div class="company-image-child">
                    <img
                        src={SamsungLogo}
                        alt="삼성배경"
                        class="company-logo1"
                    />
                </div>
            </div>
            <div class="company-description">
                삼성전자는 전 세계에서 전자제품을 만드는 큰 회사에요. 이 회사는
                다양한 물건을 만들어서 팔고 있어요. 그 중에는 TV, 컴퓨터 모니터,
                냉장고, 세탁기, 에어컨, 스마트폰, 네트워크 장치, 그리고 컴퓨터와
                같은 것들이 있어요. 또한 작은 컴퓨터 칩과 같은 것들도 만들어요.
                그 중에는 기억장치 칩, 모바일 프로세서(AP)와 같은 것이 있어요.
                그리고 화면을 보여주는 작은 패널도 만들어요.
            </div>

            <div class="outlink-btns">
                <div class="outlink-btn">
                    <span class="tooltip">uiverse.io</span>
                    <span>Tooltip</span>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
