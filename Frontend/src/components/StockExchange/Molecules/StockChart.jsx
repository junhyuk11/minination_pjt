import React from 'react';
import EconomyRow from '../Atoms/EconomyRow.jsx';
import HomeCard from '../Atoms/EconomyColumn.jsx';

const Economy = ({ data }) => {
    const contentDom = <EconomyRow data={[...data]} />;

    return (
        <div>
            <HomeCard title="주가" content={contentDom} />
        </div>
    );
};

export default Economy;
