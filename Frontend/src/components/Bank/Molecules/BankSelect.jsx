import React from 'react';
import ButtonMiddle from '../../Common/Atoms/ButtonMiddle1.jsx'; // DropDown2 컴포넌트 추가

function BankSelect({ onClick }) {
    const buttonBankStyle = {
        display: 'flex', // flexbox 사용
        alignItems: 'center', // 상하 가운데 정렬
        justifyContent: 'center', // 좌우 가운데 정렬
        width: '10%',
        height: '70px',
        borderRadius: '2rem',
        border: 'none',
        backgroundColor: '#2B788B',
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <div>
            <ButtonMiddle
                type="button"
                title="입출금 내역조회"
                style={buttonBankStyle}
                onClick={onClick}
            />
            <ButtonMiddle
                type="button"
                title="예적금 상품조회"
                style={buttonBankStyle}
                onClick={onClick}
            />
        </div>
    );
}

export default BankSelect;
