import React from 'react';
import flag1 from '../../../assets/icons/Foundation/Flag1.svg';
import NationTitle from '../Atoms/NationTitle.jsx';
// import HomeCard from '../Molecules/HomeCard';

const Nation = () => {
    const response = {
        nationName: '개발의 민족',
        flag: flag1,
    };
    const { nationName, flag } = response;
    const nationStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const imgStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
        borderRadius: '25px',
    };

    return (
        <div style={nationStyle}>
            <NationTitle title={nationName} />
            <img style={imgStyle} src={flag} alt="flag" />
        </div>
    );
};

export default Nation;
