import React from 'react';

function ButtonLarge1({ title, onClick }) {
    const buttonStyle = {
        width: '100%',
        padding: '1rem',
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
