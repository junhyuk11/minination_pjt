import React from 'react';
import HomeCard from '../Molecules/HomeCard';
import cardGif from '../../../assets/gif/profile.gif';
import ProfileRow from '../Molecules/ProfileRow';

const Profile = () => {
    const response = {
        name: '정준혁',
        jobName: '은행원',
        pay: 200,
        currency: '미소',
        totalBalance: 5000,
        productAmount: 3,
    };

    const { name, jobName, pay, currency, totalBalance, productAmount } =
        response;
    const contentDom = (
        <>
            <ProfileRow
                name={name}
                jobName={jobName}
                pay={pay}
                currency={currency}
                totalBalance={totalBalance}
                productAmount={productAmount}
            />
        </>
    );

    return (
        <div>
            <HomeCard
                title="프로필"
                content={contentDom}
                gif={cardGif}
                contentStyle="center"
            />
        </div>
    );
};

export default Profile;
