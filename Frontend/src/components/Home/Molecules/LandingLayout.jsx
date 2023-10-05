import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import useMemberApi from '../../../api/useMemberApi.jsx';
import StartButton from '../../Common/Atoms/StartButton.jsx';
import styles from '../Pages/Landing.module.css';
import landingImage from '../../../assets/images/landing-image.png';

function LandingLayout() {
    const {
        navigateToLogin,
        navigateToDashboard,
        navigateToNationality,
        navigateToFoundation,
    } = useNavigation();

    const handleStart = () => {
        const jwt = sessionStorage.getItem('accessToken');
        if (jwt) {
            try {
                const response = useMemberApi.memberPostCheck();
                if (response.data.nationName) {
                    navigateToDashboard();
                } else {
                    if (response.data.memType === 'ST') {
                        navigateToNationality();
                    } else {
                        navigateToFoundation();
                    }
                }
            } catch (error) {
                console.log(error);
                navigateToLogin();
            }
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
