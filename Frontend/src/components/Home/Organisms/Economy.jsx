import React, { useState, useEffect } from 'react';
import useHomeApi from '../../../api/useHomeApi.jsx';
import EconomyRow from '../Molecules/EconomyRow.jsx';
import HomeCard from '../Molecules/HomeCard.jsx';
import cardGif from '../../../assets/gif/economy.gif';

const Economy = () => {
    const [response, setResponse] = useState({ gdp: [] });
    const { gdp } = response;

    const getChartApi = async () => {
        const response = await useHomeApi.homeGetChart();
        if (response.code === 200) {
            setResponse(response.data);
        }
    };

    useEffect(() => {
        getChartApi();
    }, []);

    const contentDom = <EconomyRow data={[...gdp]} />;

    return (
        <div>
            <HomeCard
                title="경제"
                content={contentDom}
                gif={cardGif}
                contentStyle="column"
            />
        </div>
    );
};

export default Economy;
