import React from 'react';
import ButtonMiddle from '../../Common/Atoms/ButtonMiddle1.jsx';
import './BankContent.css';

const BankSelect = () => {
    return (
        <div className="bankSelectBlackBackground">
            <div className="bankSelectButtonWrapperStyle">
                <ButtonMiddle
                    type="button"
                    title="입출금 내역조회"
                    className="bankSelectButtonStyle"
                />
            </div>
            <ButtonMiddle
                type="button"
                title="예적금 상품조회"
                className="bankSelectButtonStyle"
            />
        </div>
    );
};

export default BankSelect;
