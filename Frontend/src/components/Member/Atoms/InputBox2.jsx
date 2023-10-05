import React, { useState } from 'react';

function InputBox2({
    placeholder,
    inputText,
    onChange,
    onBlur,
    type,
    onKeyDown,
}) {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        // onBlur();
    };

    const formStyle = {
        width: '100%',
    };

    const inputStyle = {
        boxSizing: 'border-box',
        width: '100%',
        padding: '1rem',
        borderRadius: '1rem',
        borderColor: isFocused ? '#a2d6ab' : '#c0c0c0',
        borderStyle: 'solid',
        outline: 'none', // 디폴트 아웃라인(검정) 삭제
    };

    return (
        <form style={formStyle}>
            <input
                value={inputText}
                placeholder={placeholder}
                name="text"
                style={inputStyle}
                onChange={onChange}
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
                type={type}
                onFocus={handleFocus}
            />
        </form>
    );
}

export default InputBox2;
