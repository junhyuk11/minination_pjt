import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../../hooks/useNavigation';
import { useRecoilState } from 'recoil';
import { identityState } from '../../../recoil/atoms.jsx';
import useMemberApi from '../../../api/useMemberApi.jsx';
import InputBox1 from './../../Common/Atoms/InputBox1.jsx';
import ButtonLarge1 from '../../Common/Atoms/ButtonLarge1.jsx';
import MovingLoginOrSignup from '../Atoms/MovingLoginOrSignup.jsx';
import styles from '../Pages/Login.module.css';
import headerLogo from '../../../assets/images/header-logo.png';

const LoginInputForm = () => {
    const [identity, setIdentity] = useRecoilState(identityState);
    const {
        navigateToLanding,
        navigateToSignup,
        navigateToDashboard,
        navigateToFoundation,
        navigateToNationality,
    } = useNavigation();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isValidForm, setIsValidForm] = useState(false);
    const [idError, setIdError] = useState({ message: '', status: false });

    const handleChange1 = event => {
        setId(event.target.value);
    };
    const handleChange2 = event => {
        setPassword(event.target.value);
    };
    const handleKeyDown1 = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            postLoginApi();
        }
    };
    const handleOnClick1 = event => {
        navigateToLanding();
    };

    const postLoginApi = async () => {
        try {
            if (!isValidForm) {
                if (!id) {
                    setIdError({
                        message: '아이디를 입력해주세요.',
                        status: false,
                    });
                } else if (!password) {
                    setIdError({
                        message: '비밀번호를 입력해주세요.',
                        status: false,
                    });
                }
                return;
            }
            const response = await useMemberApi.memberPostLogin(id, password);
            if (response.code === 200) {
                setIdentity(response.data.memType);
                sessionStorage.setItem(
                    'accessToken',
                    response.data.accessToken,
                );
                sessionStorage.setItem(
                    'refreshToken',
                    response.data.refreshToken,
                );

                if (response.data.nationName) {
                    navigateToDashboard();
                } else {
                    if (response.data.memType === 'ST') {
                        navigateToNationality();
                    } else {
                        navigateToFoundation();
                    }
                }
            } else {
                console.log(response.code);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id && password) {
            setIdError({ message: '', status: false });
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [id, password]);

    return (
        <div>
            <div className={styles.top}>
                <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src={headerLogo}
                        alt="logo"
                        onClick={handleOnClick1}
                    ></img>
                </div>
                <br />
                <InputBox1
                    placeholder="아이디"
                    inputText={id}
                    onChange={handleChange1}
                    onKeyDown={handleKeyDown1}
                    type="text"
                />
                <br />
                <InputBox1
                    placeholder="비밀번호"
                    inputText={password}
                    onChange={handleChange2}
                    onKeyDown={handleKeyDown1}
                    type="password"
                />
                {idError.message && (
                    <p
                        className={
                            idError.status ? styles.collect : styles.error
                        }
                    >
                        {idError.message}
                    </p>
                )}
                <br />
                <ButtonLarge1
                    title="로그인"
                    onClick={postLoginApi}
                    disabled={!isValidForm}
                />
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
