import React from 'react';

function MovingSignup({ description, title, onClick }) {
    const contanierStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
    };
    const buttonStyle = {
        padding: '0',
        border: 'none',
        background: 'none',
        color: '#355B3E',
        textDecorationLine: 'underline',
        cursor: 'pointer',
    };

    const pStyle = {
        color: 'rgba(53, 91, 62, 0.44)',
    };

    return (
        <div style={contanierStyle}>
            <p style={pStyle}>{description}</p>
            <button style={buttonStyle} type="button" onClick={onClick}>
                {title}
            </button>
        </div>
    );
}

export default MovingSignup;
