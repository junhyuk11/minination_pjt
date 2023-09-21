import React from 'react';
import styles from './ProductionRow.module.css';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';

const ProductionCategoryStudent = () => {
    return (
        <div className={styles.container}>
            <ProductionTitle title="직업명" />
            <ProductionTitle title="직업설명" />
            <ProductionTitle title="주급" />
            <ProductionTitle title="모집인원" />
            <ProductionTitle title="신청인원" />
            <ProductionTitle title="자격요건" />
            <ProductionTitle title="근무자" />
            <ProductionTitle title="지원하기" />
        </div>
    );
};

export default ProductionCategoryStudent;
