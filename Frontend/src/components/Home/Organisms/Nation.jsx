import React from 'react';
import flag1 from '../../../assets/icons/Foundation/Flag1.svg';
import NationTitle from '../Atoms/NationTitle';

const Nation = () => {
    const response = {
        nationName: '개발의 민족',
        flag: flag1,
    };
    const { nationName, flag } = response;
    const nationStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    };

    return (
        <div style={nationStyle}>
            <img src={flag} alt="flag" />
            <NationTitle title={nationName} />
        </div>
    );
};

export default Nation;
