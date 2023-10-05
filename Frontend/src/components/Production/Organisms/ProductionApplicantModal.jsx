import React from 'react';
import Swal from 'sweetalert2';
import styles from './ProductionApplicantModal.module.css'; // CSS 모듈 가져오기
import ProductionTitle from '../Atoms/ProductionTitle.jsx';
import ProductionButton1 from '../Atoms/ProductionButton1.jsx';
import ProductionSemiTitle from '../Molecules/ProductionSemiTitle.jsx';
import useJobApi from '../../../api/useJobApi.jsx';

const ProductionApplicantModal = ({
    applicants,
    setApplicants,
    setIsModalOpen,
    jobName,
}) => {
    // 모달 닫기
    const handleCloseClick = () => {
        setIsModalOpen(false);
        window.location.reload();
    };
    // 승인,거절,삭제 시 api요청을 보내 직업리스트를 업데이트한다.
    const fetchData = async () => {
        try {
            const response = await useJobApi.jobGetDetail({ jobName });
            setApplicants(response.data); // API 응답을 applicants 상태에 저장
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            // 오류 처리를 수행합니다.
        }
    };
    const handleApprove = applicantName => {
        Swal.fire({
            icon: 'question',
            title: '승인하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await useJobApi.jobPostApprove(
                        jobName,
                        applicantName,
                    );
                    if (response) {
                        // 정보 업데이트
                        fetchData();
                        Swal.fire({
                            icon: 'success',
                            title: '승인하였습니다.',
                            confirmButtonText: '확인',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '승인 처리 중 오류 발생',
                            confirmButtonText: '확인',
                        });
                    }
                } catch (error) {
                    console.error('승인 처리 중 오류 발생:', error);
                }
            }
        });
    };

    const handleReject = async applicantName => {
        Swal.fire({
            icon: 'warning',
            title: '거절하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await useJobApi.jobPostDecline(
                        jobName,
                        applicantName,
                    );
                    if (response) {
                        // 정보 업데이트
                        fetchData();
                        Swal.fire({
                            icon: 'success',
                            title: '거절하였습니다.',
                            confirmButtonText: '확인',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '거절 처리 중 오류 발생',
                            confirmButtonText: '확인',
                        });
                    }
                } catch (error) {
                    console.error('거절 처리 중 오류 발생:', error);
                }
            }
        });
    };

    const handleFire = async employeeName => {
        Swal.fire({
            icon: 'error',
            title: '해고하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const response = await useJobApi.jobPostFire(
                        jobName,
                        employeeName,
                    );
                    if (response) {
                        // 정보 업데이트
                        fetchData();
                        Swal.fire({
                            icon: 'success',
                            title: '해고하였습니다.',
                            confirmButtonText: '확인',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '해고 처리 중 오류 발생',
                            confirmButtonText: '확인',
                        });
                    }
                } catch (error) {
                    console.error('해고 처리 중 오류 발생:', error);
                }
            }
        });
    };

    const applicantRows = applicants.applicants.map(applicantName => (
        <div key={applicantName}>
            <hr />
            <div className={styles.modalRow}>
                <div className={styles.modalRowName}>
                    <p>{applicantName}</p>
                </div>
                <div className={styles.modalRowButtons}>
                    <ProductionButton1
                        title="승인"
                        onClick={() => handleApprove(applicantName)}
                        color="#2B788B"
                    />
                    <ProductionButton1
                        title="거절"
                        onClick={() => handleReject(applicantName)}
                        color="#2B788B"
                    />
                </div>
            </div>
        </div>
    ));

    const employeeRows = applicants.employees.map(employeeName => (
        <div key={employeeName}>
            <hr />
            <div className={styles.modalRow}>
                <div className={styles.modalRowName}>
                    <p>{employeeName}</p>
                </div>
                <div className={styles.modalRowButtons}>
                    <ProductionButton1
                        title="해고"
                        onClick={() => handleFire(employeeName)}
                        color="#8B3C2B"
                    />
                </div>
            </div>
        </div>
    ));

    const semiTitle = `인원수: 신청 ${applicants.applicatCount} 모집 ${applicants.recruitTotalCount} 근로 ${applicants.employeeCount} 잔여 ${applicants.recruitLeftCount}`;

    return (
        <div className={styles.wrapper}>
            <div className={styles.closeButtonWrapper}>
                <button
                    className={styles.closeButton}
                    onClick={handleCloseClick}
                    type="button"
                >
                    X
                </button>
            </div>
            <div className={styles.modalCard}>
                <div className={styles.modalTitle} />
                <ProductionTitle title="신청자명단" size={30} />
                <ProductionSemiTitle title={semiTitle} />
                <div>{applicantRows}</div>
                <div style={{ height: '40px' }} />
                <ProductionTitle title="직원명단" size={30} />
                <br />
                <div>{employeeRows}</div>
            </div>
        </div>
    );
};

export default ProductionApplicantModal;
