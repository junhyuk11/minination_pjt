import React from 'react';
import SignupInputForm from '../Molecules/SignupInputForm.jsx';
import styles from './Login.module.css';
import signupImage from '../../../assets/images/signup.png';

const Signup = () => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <SignupInputForm />
                </div>
                <div className={styles.imageContainer}>
                    <img
                        className={styles.img}
                        src={signupImage}
                        alt="signup"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
