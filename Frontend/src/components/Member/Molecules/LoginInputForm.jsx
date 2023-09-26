import React, { useState } from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import useMemberApi from '../../../api/useMemberApi.jsx';
import InputBox1 from '../../Common/Atoms/InputBox1.jsx';
import ButtonLarge1 from '../../Common/Atoms/ButtonLarge1.jsx';
import MovingLoginOrSignup from '../Atoms/MovingLoginOrSignup.jsx';
import styles from '../Pages/Login.module.css';
import headerLogo from '../../../assets/images/header-logo.png';

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

    const postLoginApi = async () => {
        try {
            const response = await useMemberApi.memberPostLogin(id, password);
            if (response.code === 200) {
                alert('로그인 성공!');
                // TS, 토큰 저장
                navigateToDashboard();
            } else {
                console.log(response.code);
            }
        } catch (error) {
            console.log('에러');
            console.log(error);
        }
    };

    return (
        <div>
            <div class={styles.top}>
                <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src={headerLogo}
                        alt="logo"
                    ></img>
                </div>
                <br />
                <InputBox1
                    placeholder="아이디"
                    inputText={id}
                    onChange={handleChange1}
                    type="text"
                />
                <br />
                <InputBox1
                    placeholder="비밀번호"
                    inputText={password}
                    onChange={handleChange2}
                    type="password"
                />
                <br />
                <ButtonLarge1 title="로그인" onClick={postLoginApi} />
            </div>
            <MovingLoginOrSignup
                description="아직 회원이 아니신가요?"
                title="회원가입"
                onClick={navigateToSignup}
            />
        </div>
    );
};

export default LoginInputForm;
