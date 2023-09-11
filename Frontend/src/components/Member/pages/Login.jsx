import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const Login = () => {
    const { navigateToSignup, navigateToDashboard } = useNavigation();

    return (
        <div>
            <p>로그인 페이지입니다. </p>
            <button type="button" onClick={navigateToDashboard}>
                로그인하기 (로비=Dashboard.jsx 로 )
            </button>
            <p>아직 회원이 아니신가요?</p>
            <button type="button" onClick={navigateToSignup}>
                회원가입하기 ( signup으로 )
            </button>
        </div>
    );
};

export default Login;
