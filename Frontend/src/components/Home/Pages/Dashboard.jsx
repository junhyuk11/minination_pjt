import React from 'react';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import Nation from '../Organisms/Nation.jsx';
import Constitution from '../Organisms/Constitution.jsx';
import Population from '../Organisms/Population.jsx';
import styles from './Dashboard.module.css';
import Ranking from '../Organisms/Ranking.jsx';

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
        <div className={styles.body}>
            <NavBar username="준혁" totalBalance="30000" />
            <div className={styles.layoutStyle}>
                <Nation response={response} />
                <Constitution />
                <Population />
                <Ranking />
            </div>
        </div>
    );
};

export default Dashboard;
