import React from 'react';

function ButtonSmall1({ title, onClick, width, height }) {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '2rem',
        border: 'none',
        backgroundColor: '#029664',
        color: 'white',
        cursor: 'pointer',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'end',
    };

    return (
        <div style={containerStyle}>
            <button type="button" style={buttonStyle} onClick={onClick}>
                {title}
            </button>
        </div>
    );
}

ButtonSmall1.defaultProps = {
    height: 30,
    width: 100,
};

export default ButtonSmall1;
