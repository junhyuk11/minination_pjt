import React from 'react';

function ButtonLarge1({ title, onClick }) {
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

    return (
        <button type="button" style={buttonStyle} onClick={onClick}>
            {title}
        </button>
    );
}

export default ButtonLarge1;
