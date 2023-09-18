import React, { useState } from 'react';
import MemberTitle from './../Atoms/MemberTitle.jsx';
import InputBox1 from './../../Common/Atoms/InputBox1.jsx';
import ButtonLarge1 from '../../Common/Atoms/ButtonLarge1.jsx';
import { useNavigation } from '../../../hooks/useNavigation';
import styles from '../Pages/Login.module.css';
import headerLogo from '../../../assets/images/header-logo.png';
import MovingSignup from '../Atoms/MovingSignup.jsx';

const LoginInputForm = () => {
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
            <img className={styles.logo} src={headerLogo} alt="logo"></img>
            <MemberTitle title="로그인" size={40} />
            <InputBox1
                title="아이디"
                placeholder="아이디"
                inputText={id}
                onChange={handleChange1}
                type="text"
            />
            <br />
            <InputBox1
                title="비밀번호"
                placeholder="비밀번호"
                inputText={password}
                onChange={handleChange2}
                type="password"
            />
            <br />
            <ButtonLarge1 title="Login" onClick={navigateToDashboard} />
            <MovingSignup title="회원가입" onClick={navigateToSignup} />
        </div>
    );
};

export default LoginInputForm;
