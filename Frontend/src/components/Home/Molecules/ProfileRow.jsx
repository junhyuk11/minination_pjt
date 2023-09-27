import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const ProfileRow = ({
    name,
    jobName,
    pay,
    currency,
    totalBalance,
    productAmount,
}) => {
    const { navigateToJobPosting, navigateToBankPage, navigateToMarketPage } =
        useNavigation();

    // const lineStyle = {
    //     display: 'flex',
    // };

    const nameStyle = {
        fontSize: '19px',
    };

    const aStyle = {
        // border: 'none',
        // background: 'none',
        color: '#355B3E',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '19px',
        textDecoration: 'green underline',
    };

    return (
        <div>
            <p>
                <span style={nameStyle}>{name}</span>님, 오늘도 화이팅이에요!
            </p>
            <p>
                현재 직업은{' '}
                <a 
                    style={aStyle} 
                    onClick={navigateToJobPosting}
                >
                    {jobName}
                </a>
                이고, 주급은 {pay}
                {currency} 입니다.
            </p>
            <p>
                가지고 있는 총 자산은{' '}
                <a style={aStyle} onClick={navigateToBankPage}>
                    {totalBalance}
                    {currency}
                </a>{' '}
                입니다.
            </p>
            <p>
                가지고 있는 물품 수는{' '}
                <a style={aStyle} onClick={navigateToMarketPage}>
                    {productAmount}
                </a>{' '}
                개 입니다.
            </p>
        </div>
    );
};

export default ProfileRow;
