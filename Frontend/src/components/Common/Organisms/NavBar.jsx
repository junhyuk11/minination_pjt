import React from 'react';
import './NavBar.css';
import logoimage from '../../../assets/images/header_logo.png';

function NavBar({ username, totalBalance }) {
    return (
        <div className="header">
            <a href="/home/dashboard">
                <img src={logoimage} alt="로고" className="logo" />
            </a>
            <div className="links">
                <a href="/stockexchange/stock">증권거래소</a>
                <a href="/production/jobposting">채용공고</a>
                <a href="/market/studentmarket">백화점</a>
                <a href="/bank/bankpage">은행</a>
                <a href="/admin/office">집무실</a>
            </div>
            <div className="user-info">
                <span>{username}</span>
                <span>통장 잔고: {totalBalance}원</span>
            </div>
        </div>
    );
}

export default NavBar;
