import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const Foundation = () => {
    const { navigateToDashboard } = useNavigation();

    return (
        <div>
            <p>국가건설 페이지입니다. </p>
            <button type="button" onClick={navigateToDashboard}>
                생성 완료하기
            </button>
        </div>
    );
};

export default Foundation;
