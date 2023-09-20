import React from 'react';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import Nation from '../Organisms/Nation.jsx';
import Constitution from '../Organisms/Constitution.jsx';
import Population from '../Organisms/Population.jsx';
import styles from './Dashboard.module.css';
import Ranking from '../Organisms/Ranking.jsx';
import Economy from '../Organisms/Economy.jsx';

const Dashboard = () => {
    return (
        <div className={styles.body}>
            <NavBar username="준혁" totalBalance="30000" />
            <div className={styles.layoutStyle}>
                <Nation />
                <Constitution />
                <Population />
                <Ranking />
                <Economy />
            </div>
        </div>
    );
};

export default Dashboard;
