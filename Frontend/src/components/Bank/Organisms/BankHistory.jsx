import React from 'react';
import bank3 from '../../../assets/images/bank3.png';
import './BankHistory.css';

const BankHistory = () => {
    const totalBalance = '20,000';
    return (
        <div>
            <div className="bankHistoryBlackBackground">
                내 주식 자산 : {totalBalance}
                <img
                    src={bank3}
                    alt="Bank"
                    style={{
                        marginRight: '10px',
                        width: '120px',
                        height: '120px',
                    }}
                />
            </div>
        </div>
    );
};

export default BankHistory;
