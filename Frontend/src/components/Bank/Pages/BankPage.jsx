import React from 'react';
import './BankPage.css';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import bankImage from '../../../assets/images/bank-main.png';
import BankBar from '../Organisms/BankBar.jsx';
import BankCard from '../Organisms/BankCard.jsx';
import BankContent from '../Organisms/BankContent.jsx';

const BankPage = () => {
    const totalBalance = '20000';
    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <div className="blackBackground">
                총 보유 자산 : {totalBalance}
                <img
                    src={bankImage}
                    alt="Bank"
                    style={{
                        marginRight: '10px',
                        width: '120px',
                        height: '120px',
                    }}
                />
            </div>
            <div>
                <BankBar />
                <BankCard />
                <BankContent />
            </div>
        </div>
    );
};

export default BankPage;
