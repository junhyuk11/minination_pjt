import React from 'react';
import RankingRow from '../Molecules/RankingRow';
import HomeCard from '../Molecules/HomeCard';
import cardGif from '../../../assets/gif/ranking.gif';
import ranking1 from '../../../assets/images/medal1.png';
import ranking2 from '../../../assets/images/medal2.png';
import ranking3 from '../../../assets/images/medal3.png';

const Ranking = () => {
    const response = {
        rich: [
            {
                name: '정준혁',
                asset: '5090',
            },
            {
                name: '김경륜',
                asset: '5080',
            },
            {
                name: '박예한',
                asset: '5070',
            },
        ],
    };
    const { rich } = response;
    const imageUrls = [ranking1, ranking2, ranking3];
    const contentDom = (
        <>
            {rich.map((citizen, idx) => (
                <RankingRow
                    key={citizen.name}
                    img={imageUrls[idx]}
                    ranking={idx + 1}
                    name={citizen.name}
                    asset={citizen.asset}
                />
            ))}
        </>
    );

    return (
        <div>
            <HomeCard
                title="순위"
                content={contentDom}
                gif={cardGif}
                contentStyle="center"
            />
        </div>
    );
};

export default Ranking;
