import React from 'react';

function InputBox1({ title, placeholder, inputText, onChange, type }) {
    const containerStyle = {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column', // 세로로 배치
        //width: '80%',
        margin: 'auto',
    };
    const titleStyle = {
        width: '80%',
        textAlign: 'left',
        paddingBottom: '8px',
    };
    const inputStyle = {
        width: '80%',
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
            />
        </div>
    );
}

export default InputBox1;
