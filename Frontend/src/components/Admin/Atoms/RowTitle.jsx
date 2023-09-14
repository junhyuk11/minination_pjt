import React from 'react';

const RowTitle = ({ text }) => {
    const hrStyle = {
        size: '20px',
    };

    return <div style={hrStyle}>{text}</div>;
};

export default RowTitle;
