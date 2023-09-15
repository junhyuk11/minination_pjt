import React from 'react';

const RowInput = ({ text, onTextChange, onKeyPress }) => {
    const inputStyle = {
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
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    // 'Enter' 키 누를 때 이벤트 처리
                    onKeyPress(); // onKeyPress 함수 호출
                }
            }}
        />
    );
};

export default RowInput;
