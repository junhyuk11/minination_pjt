import React from 'react';
import styles from './Foundation.module.css';
import AdminTitle from '../Atoms/AdminTitle.jsx';
import foundationImg from '../../../assets/images/foundation.jpg';
import Info from '../Organisms/Info.jsx';

const Foundation = () => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <AdminTitle title="국가건설" />
                <div className={styles.container2}>
                    <img src={foundationImg} className={styles.img} alt="" />
                    <div className={styles.info}>
                        <div className={styles.infoContent}>
                            <AdminTitle title="국가정보" />
                            <Info />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foundation;
