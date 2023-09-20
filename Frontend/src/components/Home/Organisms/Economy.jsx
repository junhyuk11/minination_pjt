import React from 'react';
import EconomyRow from '../Molecules/EconomyRow';
import HomeCard from '../Molecules/HomeCard';

const Economy = () => {
    const response = {
        gdp: [
            { time: '2019-04-11', value: 5040 },
            { time: '2019-04-12', value: 5020 },
            { time: '2019-04-13', value: 5010 },
            { time: '2019-04-14', value: 5090 },
            { time: '2019-04-15', value: 4800 },
            { time: '2019-04-16', value: 5000 },
            { time: '2019-04-17', value: 5020 },
            { time: '2019-04-18', value: 5033 },
            { time: '2019-04-19', value: 5045 },
            { time: '2019-04-20', value: 5000 },
            { time: '2019-04-21', value: 5040 },
            { time: '2019-04-22', value: 5020 },
            { time: '2019-04-23', value: 5010 },
            { time: '2019-04-24', value: 5090 },
            { time: '2019-04-25', value: 4800 },
            { time: '2019-04-26', value: 5000 },
            { time: '2019-04-27', value: 5020 },
            { time: '2019-04-28', value: 5033 },
            { time: '2019-04-29', value: 5045 },
            { time: '2019-04-30', value: 5000 },
        ],
    };
    const { gdp } = response;
    const contentDom = <EconomyRow data={[...gdp]} />;

    return (
        <div>
            <HomeCard title="경제" content={contentDom} />
        </div>
    );
};

export default Economy;
