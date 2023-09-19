import React from 'react';
import './NavBar.css';
import logoimage from '../../../assets/images/header-logo.png';

function NavBar({ username, totalBalance }) {
    return (
        <div className="header">
            <div class="inner">
                <div class="left-side">
                    <a href="/home/dashboard">
                        <img src={logoimage} alt="로고" className="logo" />
                    </a>
                    <div className="links">
                        <a href="/stockexchange/stock">증권거래소</a>
                        <a href="/production/jobposting">채용공고</a>
                        <a href="/market/marketpage">백화점</a>
                        <a href="/bank/bankpage">은행</a>
                        <a href="/admin/office">집무실</a>
                    </div>
                </div>
                <div className="right-side">
                    <span>{username}</span>

                    <div class="asset-card">
                        <p class="asset-key">잔고</p>
                        <span class="asset-value">{totalBalance}미소</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
