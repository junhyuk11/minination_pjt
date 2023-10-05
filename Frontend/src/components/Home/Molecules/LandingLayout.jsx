import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import StartButton from '../../Common/Atoms/StartButton.jsx';
import styles from '../Pages/Landing.module.css';
import landingImage from '../../../assets/images/landing-image.png';

function LandingLayout() {
    const { navigateToLogin, navigateToDashboard } = useNavigation();
    const handleStart = () => {
        const jwt = sessionStorage.getItem('accessToken');
        if (jwt) {
            navigateToDashboard();
        } else {
            navigateToLogin();
        }
    };

    return (
        <div className={styles.landingLayout}>
            <img src={landingImage} className={styles.img} alt="landing" />
            <StartButton title="지금 시작하기" onClick={handleStart} />
        </div>
    );
}

export default LandingLayout;
