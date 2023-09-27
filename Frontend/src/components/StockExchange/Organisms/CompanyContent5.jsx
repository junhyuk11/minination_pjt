/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/style-prop-object */
import React from 'react';
import './CompanyContent.css';

const CompanyContent5 = () => {
    return (
        <div class="company-content-container">
            <div class="company-name">카카오</div>
            <div class="company-image-parent">
                <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/f80ea461852513.5c5306ea3f4e0.gif"
                    alt="카카오배경"
                    class="company-coverimage"
                />
            </div>
            <div class="company-description">
                카카오는 국내 1위 메신저인 카카오톡을 포함한 다양한 모바일
                서비스를 제공 중인 '모바일 라이프 플랫폼' 기업이에요. 인터넷
                포털 사이트 다음(Daum)을 비롯해 모바일/인터넷 기반의 커머스,
                모빌리티, 금융, 게임, 음악, 스토리 IP를 주축으로 사업을 전개하고
                있어요.
            </div>

            <div class="outlink-btns">
                <a
                    href="https://comp.fnguide.com/SVO2/ASP/SVD_Finance.asp?pGB=1&gicode="
                    class="outlink-btn"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span class="tooltip">FN가이드 페이지로 이동할께요</span>
                    <span>재무제표</span>
                </a>
                <a
                    href="https://www.samsung.com/sec/"
                    class="outlink-btn"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span class="tooltip">제품판매 페이지로 이동할께요</span>
                    <span>제품정보</span>
                </a>
                <a
                    href="https://www.samsung.com/sec/about-us/company-info/"
                    class="outlink-btn"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span class="tooltip">기업 홍보 페이지로 이동할께요</span>
                    <span>기업정보</span>
                </a>
            </div>
        </div>
    );
};

export default CompanyContent5;
