import React from 'react';

function MemberTitle({ title, size }) {
    const titleStyle = {
        fontSize: `${size}px`,
        fontFamily: 'GmarketSansMedium, cursive',
        color: '#1C8A51',
    };
    return <div style={titleStyle}>{title}</div>;
}

export default MemberTitle;
