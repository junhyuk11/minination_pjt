import styles from './Login.module.css';
import LoginInputForm from '../Molecules/LoginInputForm.jsx';
import loginImage from '../../../assets/images/login.png';
const Login = () => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <LoginInputForm />
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.img} src={loginImage} alt="login" />
                </div>
            </div>
        </div>
    );
};

export default Login;
