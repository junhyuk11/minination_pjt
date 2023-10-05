import React, { useState } from 'react';

function ButtonLarge1({ title, onClick, disabled }) {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        width: '100%',
        borderRadius: '1rem',
        border: 'none',
        backgroundColor: '#029664',
        color: 'white',
        cursor: 'pointer',
        backgroundColor: isHovered ? '#027a51' : '#029664',
    };

    const disabledStyle = {
        backgroundColor: 'gray',
        cursor: 'not-allowed',
        opacity: 0.5,
    };

    const disabledButtonStyle = {
        ...buttonStyle,
        ...disabledStyle,
    };

    const handleOnClick = () => {
        if (disabled) {
            return;
        }
        onClick();
    };

    return (
        <button
            type="button"
            style={disabled ? disabledButtonStyle : buttonStyle}
            onClick={handleOnClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={false}
        >
            {title}
        </button>
    );
}

export default ButtonLarge1;
