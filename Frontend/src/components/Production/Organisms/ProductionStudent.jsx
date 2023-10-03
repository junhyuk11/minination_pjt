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

const ProductionStudent = ({ jobList }) => {
    const handleApplyClick = job => {
        Swal.fire({
            icon: 'question',
            title: '지원하시겠습니까? ',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    // API 호출
                    const response = await useJobApi.jobPostApply(job.name);
                    if (response.code === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: '지원 완료',
                            confirmButtonText: '확인',
                        });
                    }
                } catch (error) {
                  // 현재 error로 코드가 오고 있지 않아 코드로 분류가 불가능함.
                    console.error('지원 처리 중 오류 발생:', error);
                    if (error.code === 403) {
                        Swal.fire({
                            icon: 'warning',
                            title: '유효하지 않은 토큰입니다.',
                            confirmButtonText: '확인',
                        });
                    } else if (error.code === 404) {
                        Swal.fire({
                            icon: 'warning',
                            title: '지원 실패.',
                            confirmButtonText: '확인',
                        });
                    } else if (error.code === 406) {
                        Swal.fire({
                            icon: 'warning',
                            title: '잔여 자리가 없습니다.',
                            confirmButtonText: '확인',
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: '이미 신청 중이거나 근무 중입니다.',
                            confirmButtonText: '확인',
                        });
                    }
                }
            }
        });
    };

    const productionRows = jobList.map(job => (
        <ProductionRow
            key={uuid()} // Use a unique identifier (e.g., job.id) as the key
            Comp1={<ProductionTitle title={job.name} />}
            Comp2={<ProductionTitle title={job.desc} />}
            Comp3={<ProductionTitle title={`급여: ${job.pay} 만원`} />}
            Comp4={
                <ProductionTitle
                    title={`채용 인원: ${job.recruitTotalCount}명`}
                />
            }
            Comp5={<ProductionTitle title={`지원자 수: ${job.applyCount}명`} />}
            Comp6={
                <ProductionRequirement
                    title={`자격 요건: ${job.requirement}`}
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
