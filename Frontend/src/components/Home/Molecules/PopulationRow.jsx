import React from 'react';

function PopulationRow({ name, role }) {
    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
    };
    const nameStyle = {
        fontSize: '18px',
        marginRight: '8px',
    };

    return (
        <div style={rowStyle}>
            <p style={nameStyle}>{name}</p>
            <p>{role}</p>
        </div>
    );
}

export default PopulationRow;
