import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const Nationality = () => {
    const { navigateToDashboard } = useNavigation();

    return (
        <div>
            <p>국적취득 페이지입니다. </p>
            <button type="button" onClick={navigateToDashboard}>
                가입 완료하기
            </button>
        </div>
    );
};

export default Nationality;
