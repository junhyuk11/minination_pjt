/* 헌법 */
import React from 'react';
import styles from '../Pages/Dashboard.module.css';

const Constitution = () => {
    const response = {
        nationName: '개발의 민족',
        currency: '미소',
        tax: {
            incomeTax: '12',
            vat: '10',
        },
        payday: 'mon',
        population: '20',
    };
    const { nationName, currency, tax, payday, population } = response;

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>헌법</div>
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

export default Constitution;
