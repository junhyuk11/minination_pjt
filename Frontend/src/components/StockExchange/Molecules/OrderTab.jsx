/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

function OrderTab({ menu, onClick, className }) {
    const defaultButtonStyle = {
        background:
            'linear-gradient(-45deg, #3f00b5, #9f69fe, #27c8b7, #3f00b5)',
        backgroundSize: '800% 400%',
        padding: '1em 2em',
        display: 'inline-block',
        border: 'none',
        borderRadius: '10px',
        fontSize: '17px',
        fontWeight: '700',
        color: 'white',
        transition: 'all .5s ease-in-out',
        animation:
            'gradient 10s infinite cubic-bezier(.62, .28, .23, .99) both',
        filter: 'grayscale(100%)',
    };

    // `.active` 클래스가 있을 경우의 스타일
    const activeButtonStyle = {
        ...defaultButtonStyle,
        filter: 'grayscale(0%)',
        animation: 'gradient, 3s, infinite',
        transform: 'scale(0.8)',
    };

    const buttonHoverStyle = {
        ...defaultButtonStyle,
        animation: 'gradient, 3s, infinite',
        transform: 'scale(1.05)',
    };

    // className에 'active'가 포함되어 있는지 확인
    const isButtonActive = className && className.includes('active');
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <button
                type="button"
                style={
                    isButtonActive
                        ? activeButtonStyle
                        : isHovered
                        ? buttonHoverStyle
                        : defaultButtonStyle
                }
                onClick={onClick}
                className="tab-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {menu}
            </button>
        </div>
    );
}

export default OrderTab;
