import React from 'react';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import Nation from '../Organisms/Nation.jsx';

const Dashboard = () => {
    const response = {
        name: '김싸피',
        asset: '5090',
        flag: '국기이미지url',
        nation: '미소공화국',
        currency: '미소',
        income: '42',
        vat: '10',
        president: '이정화',
        citizen: ['김싸피', '박싸피'],
        rich: [
            {
                name: '정준혁',
                asset: '5090',
            },
            {
                name: '김경륜',
                asset: '5000',
            },
        ],
        gdp: [
            {
                date: '2023.01.01',
                value: '5090',
            },
        ],
    };

    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <p>Dashboard 페이지입니다. </p>
            <Nation response={response} />
        </div>
    );
};

export default Dashboard;
