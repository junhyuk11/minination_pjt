import React from 'react';
import flag1 from '../../../assets/icons/Foundation/Flag1.svg';
import NationTitle from '../Atoms/NationTitle';

const Nation = () => {
    const response = {
        name: '개발의 민족',
        flag: flag1,
    };
    const { name, flag } = response;
    const nationStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '2vw',
    };

    return (
        <div style={nationStyle}>
            <img src={flag} alt="flag" />
            <NationTitle title={name} />
        </div>
    );
};

export default Nation;
