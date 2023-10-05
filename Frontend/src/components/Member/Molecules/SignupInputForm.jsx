import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import { identityState } from '../../../recoil/atoms.jsx';
import useMemberApi from '../../../api/useMemberApi.jsx';
import styles from '../Pages/Login.module.css';
import headerLogo from '../../../assets/images/header-logo.png';
import InputBox1 from '../../Common/Atoms/InputBox1.jsx';
import InputBox2 from '../Atoms/InputBox2.jsx';
import ButtonRadio1 from '../../Common/Atoms/ButtonRadio1.jsx';
import ButtonLarge1 from '../../Common/Atoms/ButtonLarge1.jsx';
import MovingLoginOrSignup from '../Atoms/MovingLoginOrSignup.jsx';

const SignupInputForm = () => {
    const [identity, setIdentity] = useRecoilState(identityState);
    const {
        navigateToLanding,
        navigateToFoundation,
        navigateToNationality,
        navigateToLogin,
    } = useNavigation();
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [idError, setIdError] = useState({ message: '', status: false });
    const [isValidForm, setIsValidForm] = useState(false);
    const [formError, setFormError] = useState({ message: '', status: false });

    const handleChange1 = event => {
        setName(event.target.value);
    };
    const handleChange2 = event => {
        setId(event.target.value);
    };
    const handleChange3 = event => {
        setPassword(event.target.value);
    };
    const handleKeyDown1 = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            postJoinApi();
        }
    };
    const handleOnClick1 = event => {
        navigateToLanding();
    };
    const checkDuplication = async () => {
        try {
            if (!id) {
                return;
            }
            const response = await useMemberApi.memberPostId(id);
            if (response.code === 200) {
                setIdError({
                    message: '사용 가능한 아이디 입니다.',
                    status: true,
                });
            } else {
                setIdError({ message: '중복된 아이디 입니다.', status: false });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const postJoinApi = async () => {
        try {
            if (!isValidForm) {
                if (!name) {
                    setFormError({
                        message: '이름을 입력해주세요.',
                        status: false,
                    });
                } else if (!id) {
                    setFormError({
                        message: '아이디를 입력해주세요.',
                        status: false,
                    });
                } else if (!password) {
                    setFormError({
                        message: '비밀번호를 입력해주세요.',
                        status: false,
                    });
                }
                console.log('이곳...');
                return;
            }
            const response = await useMemberApi.memberPostJoin(
                id,
                password,
                name,
                type,
            );

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
                if (type === 'ST') {
                    navigateToNationality();
                } else {
                    navigateToFoundation();
                }
            } else {
                console.log(response.code);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!id) {
            // 빈문자열인 경우

            setIdError({ message: '', status: false });
        } else {
            checkDuplication();
        }
    }, [id]);

    useEffect(() => {
        if (name && id && password && type) {
            setFormError({ message: '', status: false });
        }
        if (name && id && password && type && idError.status === true) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [name, id, password, type, idError.status]);

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
                    placeholder="이름"
                    inputText={name}
                    onChange={handleChange1}
                    onKeyDown={handleKeyDown1}
                    type="text"
                />
                <br />
                <InputBox2
                    placeholder="아이디"
                    inputText={id}
                    onChange={handleChange2}
                    // onBlur={checkDuplication}
                    onKeyDown={handleKeyDown1}
                    type="text"
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
                <InputBox1
                    placeholder="비밀번호"
                    inputText={password}
                    onChange={handleChange3}
                    onKeyDown={handleKeyDown1}
                    type="password"
                />
                <br />
                <ButtonRadio1 setData={setType} />
                {formError.message && (
                    <p
                        className={
                            formError.status ? styles.collect : styles.error
                        }
                    >
                        {formError.message}
                    </p>
                )}
                <br />
                <ButtonLarge1
                    title="회원가입"
                    onClick={postJoinApi}
                    disabled={!isValidForm}
                />
            </div>
            <MovingLoginOrSignup
                description="이미 회원이신가요?"
                title="로그인"
                onClick={navigateToLogin}
            />
        </div>
    );
};

export default SignupInputForm;
