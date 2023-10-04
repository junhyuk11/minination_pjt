import React, { useState, useEffect } from 'react';
import useHomeApi from '../../../api/useHomeApi.jsx';
import HomeCard from '../Molecules/HomeCard.jsx';
import cardGif from '../../../assets/gif/profile.gif';
import ProfileRow from '../Molecules/ProfileRow.jsx';

const Profile = () => {
    const [response, setResponse] = useState({});
    const { name, jobName, pay, currency, totalBalance, productAmount } =
        response;

    const getProfileApi = async () => {
        const response = await useHomeApi.homeGetProfile();
        if (response.code === 200) {
            setResponse(response.data);
        }
    };

    useEffect(() => {
        getProfileApi();
    }, []);

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
