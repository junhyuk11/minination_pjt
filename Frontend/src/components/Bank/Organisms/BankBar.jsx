import React from 'react';
import bank1 from '../../../assets/images/bank1.png';
import bank2 from '../../../assets/images/bank2.png';
import bank3 from '../../../assets/images/bank3.png';
import './BankBar.css';

const BankBar = () => {
    const totalBalance = '20,000';
    return (
        <div className="bankBarContainer">
            <div className="bankTitleContainer">
                <div className="bankBarTitle">내 자산 </div>
            </div>
            <div className="bankBarBlackBackground">
                <div className="assetItem">
                    <img
                        src={bank1}
                        alt="Bank"
                        style={{
                            marginRight: '3vh',
                            width: '10vh',
                            height: '10vh',
                        }}
                    />
                    내 현금 자산 : {totalBalance}
                </div>
                <div className="assetItem">
                    <img
                        src={bank2}
                        alt="Bank"
                        style={{
                            marginRight: '3vh',
                            width: '10vh',
                            height: '10vh',
                        }}
                    />
                    내 주식 자산 : {totalBalance}
                </div>
                <div className="assetItem">
                    <img
                        src={bank3}
                        alt="Bank"
                        style={{
                            marginRight: '3vh',
                            width: '10vh',
                            height: '10vh',
                        }}
                    />
                    내 저축 자산 : {totalBalance}
                </div>
            </div>
        </div>
    );
};

export default BankBar;