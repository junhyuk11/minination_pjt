import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { identityState } from '../../../recoil/atoms.jsx';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';
import ProductionStudent from '../Organisms/ProductionStudent.jsx';
import ProductionTeacher from '../Organisms/ProductionTeacher.jsx';
import ProductionButton2 from '../Atoms/ProductionButton2.jsx';
import ProductionButton1 from '../Atoms/ProductionButton1.jsx';
import styles from './JobPosting.module.css';

const JobPosting = () => {
    const [identity, setIdentity] = useRecoilState(identityState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const jobList = [
        {
            name: '은행원',
            desc: '은행원은 고객이 맡긴 돈을 예치하고 고객의 대출을 상담하는 역할을 합니다.  그리고 개인이나 기업으로부터 단기 또는 장기의 자금을 보관하고 위탁합니다.',
            pay: '200',
            recruit_total_count: '4',
            apply_count: '5',
            requirement: '수학 1급 자격증, 책임 우수상',
            employees: ['김하늘', '이예은'],
            status: '0',
        },
        {
            name: '은행원',
            desc: '은행원은 고객이 맡긴...',
            pay: '200',
            recruit_total_count: '4',
            apply_count: '5',
            requirement: '수학 1급 자격증, 책임 우수상',
            employees: ['김하늘', '이예은'],
        },
        {
            name: '은행원',
            desc: '은행원은 고객이 맡긴 돈을 예치하고 고객의 대출을 상담하는 역할을 합니다.  그리고 개인이나 기업으로부터 단기 또는 장기의 자금을 보관하고 위탁합니다.',
            pay: '200',
            recruit_total_count: '4',
            apply_count: '5',
            requirement: '수학 1급 자격증, 책임 우수상',
            employees: ['김하늘', '이예은'],
            status: '0',
        },
        {
            name: '은행원',
            desc: '은행원은 고객이 맡긴...',
            pay: '200',
            recruit_total_count: '4',
            apply_count: '5',
            requirement: '수학 1급 자격증, 책임 우수상',
            employees: ['김하늘', '이예은'],
        },
        {
            name: '은행원',
            desc: '은행원은 고객이 맡긴 돈을 예치하고 고객의 대출을 상담하는 역할을 합니다.  그리고 개인이나 기업으로부터 단기 또는 장기의 자금을 보관하고 위탁합니다.',
            pay: '200',
            recruit_total_count: '4',
            apply_count: '5',
            requirement: '수학 1급 자격증, 책임 우수상',
            employees: ['김하늘', '이예은'],
            status: '0',
        },
        {
            name: '은행원',
            desc: '은행원은 고객이 맡긴...',
            pay: '200',
            recruit_total_count: '4',
            apply_count: '5',
            requirement: '수학 1급 자격증, 책임 우수상',
            employees: ['김하늘', '이예은'],
        },
    ];
    const handleAddClick = () => {
        Swal.fire({
            title: '직업 추가하기',
            html: `
                <hr>
                <div>직업명: <input id="jobName" type="text"></div>
                <br>
                <div>직업 설명: <input id="jobDesc" type="text"></div>
                <br>
                <div>주급: <input id="jobPay" type="number"></div>
                <br>
                <div>모집인원: <input id="jobRecruitCount" type="number"></div>
                <br>
                <div>자격요건: <input id="jobRequirement" type="text"></div>
                <hr>
            `,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            preConfirm: () => {
                const jobName = document.getElementById('jobName').value;
                const jobDesc = document.getElementById('jobDesc').value;
                const jobPay = document.getElementById('jobPay').value;
                const jobRecruitCount =
                    document.getElementById('jobRecruitCount').value;
                const jobRequirement =
                    document.getElementById('jobRequirement').value;

                // 주급 필드가 자연수인지 확인
                if (!Number.isInteger(Number(jobPay)) || Number(jobPay) <= 0) {
                    Swal.showValidationMessage('주급은 자연수여야 합니다.');
                    return false;
                }
                // 모집인원 필드가 자연수인지 확인
                if (
                    !Number.isInteger(Number(jobRecruitCount)) ||
                    Number(jobRecruitCount) <= 0
                ) {
                    Swal.showValidationMessage('모집인원은 자연수여야 합니다.');
                    return false;
                }

                // 여기서 API 호출을 수행하고, 성공 또는 실패 여부에 따라 Swal 띄우기
                // 성공 시
                try {
                    // API 호출 및 데이터 저장

                    Swal.fire({
                        icon: 'success',
                        title: '등록 완료',
                        confirmButtonText: '확인',
                    });
                } catch {
                    // 실패 시
                    Swal.fire({
                        icon: 'error',
                        title: '등록 실패',
                        confirmButtonText: '확인',
                    });
                }
            },
        });
    };
    return (
        <div>
            <NavBar username="여우" totalBalance="30000" />
            <div className={styles.container}>
                <ProductionTitle title="채용 공고" size={30} />
                {identity === '선생님' && (
                    <ProductionButton2
                        title="직업 추가하기"
                        onClick={handleAddClick}
                    />
                )}
            </div>
            <div style={{ display: 'flex' }}>
                <ProductionButton1
                    title="선생님으로 변경"
                    onClick={() => {
                        setIdentity('선생님');
                    }}
                />
                <ProductionButton1
                    title="학생으로 변경"
                    onClick={() => {
                        setIdentity('학생');
                    }}
                />
            </div>
            {/* Conditional rendering based on the identity state */}
            {identity === '학생' ? (
                <ProductionStudent jobList={jobList} />
            ) : (
                <ProductionTeacher
                    jobList={jobList}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default JobPosting;
