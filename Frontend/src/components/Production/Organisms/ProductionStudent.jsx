/* eslint-disable prettier/prettier */
import React from 'react';
import uuid from 'react-uuid';
import Swal from 'sweetalert2';
import ProductionRow from '../Molecules/ProductionRow.jsx';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';
import ProductionButton1 from '../Atoms/ProductionButton1.jsx';
import ProductionRequirement from '../Atoms/ProductionRequirement.jsx';
import styles from './ProductionStudent.module.css';
import ProductionCategoryStudent from '../Molecules/ProductionCatergoryStudent.jsx';
import useJobApi from '../../../api/useJobApi.jsx';

const ProductionStudent = ({ jobList, setJobList, currency }) => {
    const handleApplyClick = job => {
        Swal.fire({
            icon: 'question',
            title: '지원하시겠습니까? ',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async res => {
            if (res.isConfirmed) {
                // API 호출
                const response = await useJobApi.jobPostApply(job.name);
                if (response && response.code === 200) {
                    // 200번 응답이 왔을 경우 jobList 업데이트
                    const updatedJobList = jobList.map((j) => {
                        if (j.name === job.name) {
                            // 해당 job의 지원자수(job.applyCount)를 하나 올려줌
                            return {
                                ...j,
                                applyCount: j.applyCount + 1,
                            };
                        }
                        return j;
                    });

                    // setJobList를 사용하여 상태 업데이트
                    setJobList(updatedJobList);                    
                    Swal.fire({
                        icon: 'success',
                        title: '지원 완료',
                        confirmButtonText: '확인',
                    });
                }
            }
        });
    };

    const productionRows = jobList.map(job => (
        <ProductionRow
            key={uuid()} // Use a unique identifier (e.g., job.id) as the key
            Comp1={<ProductionTitle title={job.name} />}
            Comp2={<ProductionTitle title={job.desc} />}
            Comp3={<ProductionTitle title={`${job.pay}만 ${currency}`} />}
            Comp4={
                <ProductionTitle
                    title={`${job.recruitTotalCount}명`}
                />
            }
            Comp5={<ProductionTitle title={`${job.applyCount}명`} />}
            Comp6={
                <ProductionRequirement
                    title={`자격요건: ${job.requirement}`}
                />
            }
            Comp7={
                <ProductionTitle title={`직원: ${job.employees.join(', ')}`} />
            }
            Comp8={
                <ProductionButton1
                    title="지원하기"
                    onClick={() => handleApplyClick(job)}
                />
            }
            className={styles.container}
        />
    ));

    return (
        <div className={styles.productionStudent}>
            <ProductionCategoryStudent />
            {productionRows}
        </div>
    );
};

export default ProductionStudent;
