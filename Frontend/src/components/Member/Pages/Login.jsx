import React, { useState } from 'react';
import InputBox1 from '../../Common/Atoms/InputBox1.jsx';
import InputBox2 from '../../Common/Atoms/InputBox2.jsx';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const Login = () => {
    const { navigateToSignup, navigateToDashboard } = useNavigation();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleChange1 = event => {
        setId(event.target.value);
    };
    const handleChange2 = event => {
        setPassword(event.target.value);
    };
    return (
        <div>
            <p>로그인 페이지입니다. </p>
            <InputBox1
                title="아이디"
                placeholder="아이디  "
                inputText={id}
                onChange={handleChange1}
            />
            <br />
            <InputBox2
                title="비밀번호"
                placeholder="비밀번호"
                inputText={password}
                onChange={handleChange2}
            />
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
