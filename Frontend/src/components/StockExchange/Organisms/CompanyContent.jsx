import React from 'react';
import './CompanyContent.css';

const CompanyContent = ({ info }) => {
    const profileExtension =
        info && info.profile.split('.').pop().toLowerCase();

    return (
        <div className="company-content-container">
            {info && (
                <>
                    <div className="company-name">{info.name}</div>
                    <div className="company-image-parent">
                        {profileExtension === 'gif' ? (
                            <img
                                alt="기업 소개 프로필"
                                src={info.profile}
                                className="company-coverimage"
                            />
                        ) : (
                            <video
                                alt="기업 소개 프로필"
                                src={info.profile}
                                className="company-coverimage"
                                controls
                                muted
                            ></video>
                        )}
                    </div>
                    <div className="company-description">{info.desc}</div>
                    <div className="outlink-btns">
                        <a
                            href={info.report}
                            className="outlink-btn"
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="tooltip">
                                FN가이드 페이지로 이동할께요
                            </span>
                            <span>재무제표</span>
                        </a>
                        <a
                            href={info.product}
                            className="outlink-btn"
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="tooltip">
                                제품판매 페이지로 이동할께요
                            </span>
                            <span>제품정보</span>
                        </a>
                        <a
                            href={info.inc}
                            className="outlink-btn"
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="tooltip">
                                기업 홍보 페이지로 이동할께요
                            </span>
                            <span>기업정보</span>
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

export default CompanyContent;
