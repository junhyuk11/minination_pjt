import React from 'react';
import NavBar from '../../Common/organisms/NavBar.jsx';

const BankPage = () => {
    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <p>은행 화면 페이지입니다. </p>
        </div>
    );
};

export default BankPage;
