import React from 'react';

function InputBox1({ title, placeholder, inputText, onChange }) {
    const titleStyle = {
        width: '432px',
        margin: 'auto',
        textAlign: 'left',
        paddingBottom: '10px',
        paddingLeft: '20px',
    };

    const inputStyle = {
        width: '402px',
        maxWidth: '400px',
        padding: '1rem',
        borderRadius: '1rem',
        border: 'none',
        boxShadow: '2px 2px 30px 2px lightgrey',
    };

    return (
        <div>
            <div style={titleStyle}>{title}</div>
            <input
                value={inputText}
                placeholder={placeholder}
                name="text"
                style={inputStyle}
                onChange={onChange}
            />
        </div>
    );
}

export default InputBox1;
