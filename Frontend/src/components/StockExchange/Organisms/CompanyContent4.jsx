/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/style-prop-object */
import React from 'react';
import './CompanyContent.css';

const CompanyContent4 = () => {
    return (
        <div class="company-content-container">
            <div class="company-name">하이브</div>
            <div class="company-image-parent">
                <img
                    src="https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/VUSCZGH3E5ARJEDG5ZKSFXQZ5E.gif"
                    alt="하이브배경"
                    class="company-coverimage"
                />
            </div>
            <div class="company-description">
                넥슨은 우수한 IP와 탄탄한 개발력, 20년 이상의 온라인게임 서비스
                경험을 바탕으로 글로벌 종합 엔터테인먼트 기업으로 거듭나고
                있어요. '메이플스토리', '던전앤파이터', '카트라이더', '마비노기'
                등 핵심 IP와 함께, 새로운 상상력과 아이디어를 담아낸 게임
                콘텐츠를 50종 이상, 190여개 국가, 19억 명의 글로벌 이용자에게
                서비스하고 있어요.
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

export default CompanyContent4;
