import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './NavBar.css';
import { useRecoilState } from 'recoil';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import logoimage from '../../../assets/images/header-logo.png';
import ProductionButton1 from '../../Production/Atoms/ProductionButton1.jsx';
import { identityState } from '../../../recoil/atoms.jsx';
import useHomeApi from '../../../api/useHomeApi.jsx';
import useMemberApi from '../../../api/useMemberApi.jsx';

function NavBar() {
    const { navigateToBankPage, navigateToLogin } = useNavigation();
    const [identity, setIdentity] = useRecoilState(identityState);
    const [userInfo, setUserInfo] = useState([]);

    const getUserInfo = async () => {
        try {
            const response = await useHomeApi.homeGetProfile();
            if (response.code === 200) {
                setUserInfo(response.data);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleLogout = async () => {
        try {
            const response = await useMemberApi.memberPostLogout();
            if (response.code === 200) {
                Swal.fire('로그아웃 되었습니다.').then(result => {
                    if (result.isConfirmed) {
                        sessionStorage.clear();
                        navigateToLogin();
                    }
                });
            } else {
                console.log('로그아웃 실패', response.code);
            }
        } catch (error) {
            console.error('로그아웃 중 문제 발생', error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="header">
            <div class="inner">
                <div class="left-side">
                    <a href="/home/dashboard">
                        <img src={logoimage} alt="로고" className="logo" />
                    </a>
                    <div className="links">
                        <a href="/stockexchange/stock" className="navbar-btn">
                            증권거래소
                        </a>
                        <a href="/production/jobposting" className="navbar-btn">
                            채용공고
                        </a>
                        <a href="/market/marketpage" className="navbar-btn">
                            백화점
                        </a>
                        <a href="/bank/bankpage" className="navbar-btn">
                            은행
                        </a>
                        {identity === 'TC' && (
                            <a href="/admin/office" className="navbar-btn">
                                집무실
                            </a>
                        )}
                    </div>
                </div>
                <div className="right-side">
                    <div className="asset-card " onClick={navigateToBankPage}>
                        <div className="title">
                            <span>
                                <svg
                                    width="20"
                                    fill="currentColor"
                                    height="20"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z" />
                                </svg>
                            </span>
                            <p className="title-text">
                                {userInfo.name}님의 자산
                            </p>
                        </div>
                        <div className="data">
                            <p>
                                {userInfo.totalBalance}
                                <span> {userInfo.currency}</span>
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <ProductionButton1
                            title="로그아웃"
                            onClick={() => {
                                handleLogout();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
