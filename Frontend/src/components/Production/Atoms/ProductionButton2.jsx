import React from 'react';

function ProductionButton2({ title, onClick }) {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '50px',
        borderRadius: '2rem',
        border: '1px solid #029664',
        backgroundColor: 'white',
        color: '#029664',
        cursor: 'pointer',
    };

    return (
        <div>
            <button type="button" style={buttonStyle} onClick={onClick}>
                {title}
            </button>
        </div>
    );
}

export default ProductionButton2;
