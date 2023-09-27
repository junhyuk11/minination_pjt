import React, { useState, useEffect } from 'react';
import useHomeApi from '../../../api/useHomeApi';
import PopulationRow from '../Molecules/PopulationRow';
import HomeCard from '../Molecules/HomeCard';
import cardGif from '../../../assets/gif/population.gif';

const Population = () => {
    const [response, setResponse] = useState({ citizen: [] });
    const { president, citizen } = response;

    const getCitizenApi = async () => {
        const response = await useHomeApi.homeGetCitizen();
        if (response.code === 200) {
            setResponse(response.data);
        }
    };

    useEffect(() => {
        getCitizenApi();
    }, []);

    const contentDom = (
        <>
            <PopulationRow name={president} role="대통령" />
            {citizen.map((name, idx) => (
                <PopulationRow key={idx} name={name} role="국민" />
            ))}
        </>
    );

    return (
        <div>
            <HomeCard
                title={`인구(${citizen.length + 1}명)`}
                content={contentDom}
                gif={cardGif}
                contentStyle="wrap"
            />
        </div>
    );
};

export default Population;
