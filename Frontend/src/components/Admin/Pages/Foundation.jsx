import React from 'react';
import styles from './Foundation.module.css';
import AdminTitle from '../Atoms/AdminTitle.jsx';
import FoundationImg from '../../../assets/images/Foundation.jpg';
import Info from '../Organisms/Info.jsx';

const Foundation = () => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <AdminTitle title="국가 건설" />
                <div className={styles.container2}>
                    <img src={FoundationImg} className={styles.img} alt="" />
                    <div className={styles.info}>
                        <div className={styles.infoContent}>
                            <AdminTitle title="국가 정보" />
                            <Info />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foundation;
