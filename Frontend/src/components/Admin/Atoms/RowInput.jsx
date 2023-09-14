import React from 'react';

const RowInput = ({ text, onTextChange }) => {
    const inputStyle = {
        width: '120px',
        height: '30px',
        flexShrink: 0,
        border: '1px solid rgba(0, 0, 0, 0.50)',
        background: '#FFF',
    };

    return (
        <input
            style={inputStyle}
            type="text"
            value={text}
            onChange={e => onTextChange(e.target.value)}
        />
    );
};

export default RowInput;
