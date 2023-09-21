import React from 'react';
import styles from './ProductionRow.module.css';

const ProductionRow = ({
    Comp1,
    Comp2,
    Comp3,
    Comp4,
    Comp5,
    Comp6,
    Comp7,
    Comp8,
}) => {
    return (
        <div className={styles.container}>
            {Comp1}
            {Comp2}
            {Comp3}
            {Comp4}
            {Comp5}
            {Comp6}
            {Comp7}
            {Comp8}
        </div>
    );
};

export default ProductionRow;
