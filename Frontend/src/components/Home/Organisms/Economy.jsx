import React, { useState, useEffect } from 'react';
import useHomeApi from '../../../api/useHomeApi.jsx';
import EconomyRow from '../Molecules/EconomyRow.jsx';
import HomeCard from '../Molecules/HomeCard.jsx';
import cardGif from '../../../assets/gif/economy.gif';

const Economy = () => {
    const [response, setResponse] = useState({ gdp: [] });
    const { gdp } = response;

    // const response = {
    //     gdp: [
    //         {
    //             time: '2023-09-26',
    //             value: 12345,
    //         },
    //         {
    //             time: '2023-09-25',
    //             value: 2345,
    //         },
    //     ],
    // };

    // const response = {
    //     gdp: [
    //         { time: '2019-04-11', value: 5040 },
    //         { time: '2019-04-12', value: 5020 },
    //         { time: '2019-04-13', value: 5010 },
    //         { time: '2019-04-14', value: 5090 },
    //         { time: '2019-04-15', value: 4800 },
    //         { time: '2019-04-16', value: 5000 },
    //         { time: '2019-04-17', value: 5020 },
    //         { time: '2019-04-18', value: 5033 },
    //         { time: '2019-04-19', value: 5045 },
    //         { time: '2019-04-20', value: 5000 },
    //         { time: '2019-04-21', value: 5040 },
    //         { time: '2019-04-22', value: 5020 },
    //         { time: '2019-04-23', value: 5010 },
    //         { time: '2019-04-24', value: 5090 },
    //         { time: '2019-04-25', value: 4800 },
    //         { time: '2019-04-26', value: 5000 },
    //         { time: '2019-04-27', value: 5020 },
    //         { time: '2019-04-28', value: 5033 },
    //         { time: '2019-04-29', value: 5045 },
    //         { time: '2019-04-30', value: 5000 },
    //         { time: '2019-05-01', value: 5040 },
    //         { time: '2019-05-02', value: 5020 },
    //         { time: '2019-05-03', value: 5010 },
    //         { time: '2019-05-04', value: 5090 },
    //         { time: '2019-05-05', value: 4800 },
    //         { time: '2019-05-06', value: 5000 },
    //         { time: '2019-05-07', value: 5020 },
    //         { time: '2019-05-08', value: 5033 },
    //         { time: '2019-05-09', value: 5045 },
    //         { time: '2019-05-10', value: 5000 },
    //         { time: '2019-05-11', value: 5040 },
    //         { time: '2019-05-12', value: 5020 },
    //         { time: '2019-05-13', value: 5010 },
    //         { time: '2019-05-14', value: 5090 },
    //         { time: '2019-05-15', value: 4800 },
    //         { time: '2019-05-16', value: 5000 },
    //         { time: '2019-05-17', value: 5020 },
    //         { time: '2019-05-18', value: 5033 },
    //         { time: '2019-05-19', value: 5045 },
    //         { time: '2019-05-20', value: 5000 },
    //     ],
    // };

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
