import React from 'react';
import styles from '../Pages/Dashboard.module.css';

const Population = () => {
    const response = {
        president: '이정화',
        citizen: ['김싸피', '박싸피'],
    };
    const { president, citizen } = response;

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>인구</div>
            <div className={styles.cardContent}>
                <p>1조 국가 이름은 {nationName} 으로 한다.</p>
                <p>2조 소득세는 {tax.incomeTax} 이다.</p>
                <p>3조 부가가치세는 {tax.vat} 이다.</p>
                <p>4조 화폐 단위는 {currency} 로 한다.</p>
                <p>5조 주급 지급일은 {payday} 로 한다.</p>
                <p>6조 인구수는 {population}명 이다.</p>
            </div>
        </div>
    );
};

export default Population;
