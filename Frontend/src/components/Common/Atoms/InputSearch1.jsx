import React from 'react';
import { ReactComponent as Dotbogi } from '../../../assets/icons/Dotbogi.svg';

// eslint-disable-next-line no-unused-vars
function InputSearch1({ text, onClick, onChange }) {
    const containerStyle = {
        width: '400px',
        height: '40px',
        borderRadius: '100px',
        border: '1px solid #000',
        background: '#FFF',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
    };

    const inputStyle = {
        width: '350px',
        height: '35px',
        border: 'none',
        outline: 'none',
    };

    const dotbogiIconStyle = {
        width: '30px',
        height: '30px',
    };

    return (
        <div style={containerStyle}>
            <input
                value={text}
                name="text"
                onChange={onChange}
                style={inputStyle}
            />
            <Dotbogi style={dotbogiIconStyle} onClick={onClick} />
        </div>
    );
}

export default InputSearch1;
