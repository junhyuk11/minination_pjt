import React from 'react';

function BankButtonMiddle({ title, onClick, className }) {
    const defaultButtonStyle = {
        color: '#090909',
        width: '130px',
        height: '50px',
        padding: '0.3em 0.3em',
        fontSize: '14px',
        fontWeight: '900',
        borderRadius: '0.5em',
        background: '#e8e8e8',
        border: '1px solid #e8e8e8',
        transition: 'all .3s',
        boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
        fontFamily: 'GmarketSansMedium, cursive',
        cursor: 'pointer',
    };

    // `.active` 클래스가 있을 경우의 스타일
    const activeButtonStyle = {
        ...defaultButtonStyle,
        color: '#29905b',
        boxShadow: 'inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff',
    };

    // className에 'active'가 포함되어 있는지 확인
    const isButtonActive = className && className.includes('active');

    return (
        <div>
            <button
                type="button"
                style={isButtonActive ? activeButtonStyle : defaultButtonStyle}
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
}

export default BankButtonMiddle;
