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

// 선생님에게 보여줄 채용공고 페이지
const ProductionTeacher = ({ jobList, setJobList, currency }) => {
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

    // 특정 직업 관리하기 클릭시 실행되는 함수
    const handleManageClick = jobName => {
        // api 요청 등 필요한 데이터 처리
        const fetchData = async () => {
            try {
                const response = await useJobApi.jobGetDetail({ jobName });
                setApplicants(response.data); // API 응답을 applicants 상태에 저장
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
                // 오류 처리를 수행합니다.
            }
        };

        fetchData();
        setModalJobName(jobName);
        setIsModalOpen(true);
    };
    // ---------------------------------------------
    const handleDeleteClick = jobName => {
        swal.fire({
            icon: 'warning',
            title: '삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await useJobApi.jobDelete(jobName);
                    if (response.code === 200) {
                        swal.fire({
                            icon: 'success',
                            title: '삭제하였습니다.',
                            confirmButtonText: '확인',
                        });
                        // 삭제 성공 시 jobList 업데이트
                        setJobList(prevJobList => {
                            // 작업 목록에서 삭제한 작업을 제외하고 새 배열을 생성
                            return prevJobList.filter(
                                job => job.name !== jobName,
                            );
                        });
                    } else if (response.code === 403) {
                        swal.fire({
                            icon: 'error',
                            title: '유효하지 않은 토큰입니다.',
                            confirmButtonText: '확인',
                        });
                    } else if (response.code === 404) {
                        swal.fire({
                            icon: 'error',
                            title: '삭제에 실패하였습니다.',
                            confirmButtonText: '확인',
                        });
                    } else {
                        swal.fire({
                            icon: 'error',
                            title: '알 수 없는 오류가 발생했습니다.',
                            confirmButtonText: '확인',
                        });
                    }
                } catch (error) {
                    console.error('API 요청 중 오류 발생:', error);
                    swal.fire({
                        icon: 'error',
                        title: '알 수 없는 오류가 발생했습니다.',
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
                        jobName={modalJobName}
                        setApplicants={setApplicants}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductionTeacher;
