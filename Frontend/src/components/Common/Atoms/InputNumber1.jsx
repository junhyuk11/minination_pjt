import React, { useState, useEffect } from 'react';

function InputNumber1({ onChange, initialValue }) {
    const [value, setValue] = useState(initialValue || 0);

    const containerStyle = {
        width: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    const minusStyle = {
        width: '14px',
        height: '14px',
        padding: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: '8px',
        background: '#029664',
        color: 'white',
    };

    const inputStyle = {
        minWidth: '60px',
        height: '14px',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #B8D6BF',
        background: '#FFF',
    };

    const handleInputChange = event => {
        setValue(parseInt(event.target.value, 10));
    };

    const increment = () => {
        setValue(prevValue => prevValue + 1);
    };

    const decrement = () => {
        setValue(prevValue => (prevValue > 0 ? prevValue - 1 : prevValue));
    };

    useEffect(() => {
        // Notify the parent component when value changes
        onChange(value);
    }, [value]);

    return (
        <div style={containerStyle}>
            <button type="button" style={minusStyle} onClick={decrement}>
                -
            </button>
            <span className="gap"> </span>
            <input
                style={inputStyle}
                type="number"
                value={value}
                onChange={handleInputChange}
                min={0}
            />
            <span className="gap"> </span>
            <button type="button" style={minusStyle} onClick={increment}>
                +
            </button>
        </div>
    );
}

export default InputNumber1;
