import React from 'react';

const ProductionTitle = ({ title, size }) => {
    const titleStyle = {
        fontSize: `${size}px`,
        maxWidth: '140px',
    };
    return <div style={titleStyle}>{title}</div>;
};

export default ProductionTitle;
