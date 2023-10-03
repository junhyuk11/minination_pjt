/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import uuid from 'react-uuid';
import swal from 'sweetalert2';
import ProductionRow from '../Molecules/ProductionRow.jsx';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';
import ProductionButton1 from '../Atoms/ProductionButton1.jsx';
import ProductionRequirement from '../Atoms/ProductionRequirement.jsx';
import styles from './ProductionTeacher.module.css';
import ProductionApplicantModal from './ProductionApplicantModal.jsx';
import ProductionCategoryTeacher from '../Molecules/ProductionCatergoryTeacher.jsx';
import useJobApi from '../../../api/useJobApi.jsx';

const ProductionTeacher = ({ jobList }) => {
    // --------------직원 관리하기-------------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicants, setApplicants] = useState({
        // api 응답 전 임시 데이터
        applicatCount: 0,
        recruitTotalCount: 0,
        employeeCount: 0,
        recruitLeftCount: 0,
        applicants: [],
        employees: [],
    });
    const [modalJobName, setModalJobName] = useState('');

    const handleManageClick = job_name => {
        // api 요청 등 필요한 데이터 처리
        const fetchData = async () => {
            try {
                const response = await useJobApi.jobGetDetail({job_name});
                setApplicants(response.data); // API 응답을 applicants 상태에 저장합니다.
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
                // 오류 처리를 수행합니다.
            }
        };

        fetchData();
        setModalJobName(job_name);
        setIsModalOpen(true);
    };
    // ---------------------------------------------
    const handleDeleteClick = job_name => {
        swal.fire({
            icon: 'warning',
            title: '삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                // 삭제 처리 로직을 구현하고, 필요한 API 호출을 수행합니다.
                swal.fire({
                    icon: 'success',
                    title: '삭제하였습니다.',
                    confirmButtonText: '확인',
                });
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
                    title={`채용 인원: ${job.recruit_total_count}명`}
                />
            }
            Comp5={
                <ProductionTitle title={`지원자 수: ${job.apply_count}명`} />
            }
            Comp6={
                <ProductionRequirement
                    title={`자격 요건: ${job.requirement}`}
                />
            }
            Comp7={
                <ProductionButton1
                    title="인원관리"
                    onClick={() => handleManageClick(job.name)}
                    color="#2B788B"
                />
            }
            Comp8={
                <ProductionButton1
                    title="삭제하기"
                    onClick={() => handleDeleteClick(job.name)}
                    color="#2B788B"
                />
            }
            className={styles.container}
        />
    ));

    return (
        <div className={styles.productionTeacher}>
            <ProductionCategoryTeacher />
            {productionRows}
            {isModalOpen && (
                <div className={styles.modalBackground}>
                    <ProductionApplicantModal
                        applicants={applicants} // applicants 전달
                        setIsModalOpen={setIsModalOpen}
                        job_name={modalJobName}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductionTeacher;
