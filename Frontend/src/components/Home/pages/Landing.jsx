import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const Landing = () => {
    const { navigateToLogin } = useNavigation();

    return (
        <div>
            <p>Landing 페이지입니다. </p>
            <button type="button" onClick={navigateToLogin}>
                지금 시작하기(로그인 화면으로)
            </button>
        </div>
    );
};

export default Landing;
