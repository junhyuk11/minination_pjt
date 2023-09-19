import React, { useState } from 'react';
import MarketModal1 from '../Organisms/MarketModal1.jsx';

function MarketButtonSmall({ title, className }) {
    const defaultButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90px',
        height: '20px',
        borderRadius: '2rem',
        border: 'none',
        backgroundColor: '#029664',
        color: 'white',
        cursor: 'pointer',
    };

    // `.active` 클래스가 있을 경우의 스타일
    const activeButtonStyle = {
        ...defaultButtonStyle,
        backgroundColor: 'blue',
        color: 'white',
    };

    // className에 'active'가 포함되어 있는지 확인
    const isButtonActive = className && className.includes('active');

    // 모달의 상태를 관리하는 state
    const [isModalVisible, setModalVisible] = useState(false);

    // 모달을 보여주는 함수
    const showModal = () => {
        setModalVisible(true);
    };

    // 모달을 숨기는 함수
    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <button
                type="button"
                style={isButtonActive ? activeButtonStyle : defaultButtonStyle}
                onClick={showModal}
            >
                {title}
            </button>
            {isModalVisible && <MarketModal1 hideModal={hideModal} />}
        </div>
    );
}

export default MarketButtonSmall;
