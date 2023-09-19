import React from 'react';
import flag1 from '../../../assets/icons/Foundation/Flag1.svg';
import NationTitle from '../Atoms/NationTitle';

const Nation = ({ response }) => {
    // TODO: api 연결 후 img src를 flag로 수정하기
    const { flag, nation } = response;
    const style = {
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div style={style}>
            <img src={flag1} alt="flag" />
            <NationTitle title={nation} />
        </div>
    );
};

export default Nation;
