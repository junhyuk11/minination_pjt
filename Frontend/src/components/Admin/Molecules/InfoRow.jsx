import React from 'react';
import RowTitle from '../Atoms/RowTitle.jsx';

const InfoRow = ({ title, secondComp, thirdComp }) => {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <RowTitle text={title} /> :{secondComp}
                {thirdComp}
            </div>
            <hr />
        </div>
    );
};

export default InfoRow;
