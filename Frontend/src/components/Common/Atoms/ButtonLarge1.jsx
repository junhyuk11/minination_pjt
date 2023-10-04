import React from 'react';

function ButtonLarge1({ title, onClick, disabled }) {
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

    return (
        <button
            type="button"
            style={disabled ? disabledButtonStyle : buttonStyle}
            onClick={onClick}
            disabled={false}
        >
            {title}
        </button>
    );
}

export default ButtonLarge1;
