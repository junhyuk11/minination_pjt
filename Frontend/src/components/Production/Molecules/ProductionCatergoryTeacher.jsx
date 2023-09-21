import React from 'react';
import styles from './ProductionRow.module.css';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';

const ProductionCategoryTeacher = () => {
    return (
        <div className={styles.container}>
            <ProductionTitle title="직업명" />
            <ProductionTitle title="직업설명" />
            <ProductionTitle title="주급" />
            <ProductionTitle title="모집인원" />
            <ProductionTitle title="신청인원" />
            <ProductionTitle title="자격요건" />
            <ProductionTitle title="인원관리" />
            <ProductionTitle title="삭제하기" />
        </div>
    );
};

export default ProductionCategoryTeacher;
