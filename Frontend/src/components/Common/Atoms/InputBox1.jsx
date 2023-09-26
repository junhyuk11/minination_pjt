import React from 'react';

function InputBox1({ title, placeholder, inputText, onChange, type }) {
    const containerStyle = {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column', // 세로로 배치
        margin: 'auto',
    };
    const titleStyle = {
        width: '140%',
        textAlign: 'left',
        marginBottom: '8px',
    };
    const inputStyle = {
        width: '130%',
        padding: '1rem',
        borderRadius: '1rem',
    };

    return (
        <div style={containerStyle}>
            <div style={titleStyle}>{title}</div>
            <input
                value={inputText}
                placeholder={placeholder}
                name="text"
                style={inputStyle}
                onChange={onChange}
                type={type}
                autoComplete="off"
            />
        </div>
    );
}

export default InputBox1;
