import React from 'react';
import NavBar from '../../Common/Organisms/NavBar.jsx';

const Dashboard = () => {
    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <p>Dashboard 페이지입니다. </p>
        </div>
    );
};

export default Dashboard;
