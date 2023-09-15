import React from 'react';
// import bank1 from '../../../assets/images/bank1.png';
import './BankHistory.css';

const BankHistory = () => {
    const totalBalance = '20,000';
    return (
        <div>
            <div className="bankHistoryBlackBackground">
                
                내 현금 자산 : {totalBalance}
                <img
                    src={bank2}
                    alt="Bank"
                    style={{
                        marginRight: '10px',
                        width: '120px',
                        height: '120px',
                    }}
                />
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
                내 저축 자산 : {totalBalance}
            </div>
        </div>
    );
};

export default BankHistory;
