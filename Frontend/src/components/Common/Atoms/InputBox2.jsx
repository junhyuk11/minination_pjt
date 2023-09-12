import React from 'react';

function InputBox2({ title, placeholder, inputText, onChange }) {
    const containerStyle = {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column', // 세로로 배치
        width: '450px',
        margin: 'auto',
    };

    const titleStyle = {
        width: '412px',
        textAlign: 'left',
        paddingBottom: '10px',
        paddingLeft: '10px',
    };

    const inputStyle = {
        width: '402px',
        padding: '1rem',
        borderRadius: '1rem',
        border: 'none',
        boxShadow: '2px 2px 30px 2px lightgrey',
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
                type="password"
            />
        </div>
    );
}

export default InputBox2;
