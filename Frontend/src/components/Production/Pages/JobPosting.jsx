import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { identityState } from '../../../recoil/atoms.jsx';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';
import ProductionStudent from '../Organisms/ProductionStudent.jsx';
import ProductionTeacher from '../Organisms/ProductionTeacher.jsx';
import ProductionAddModal from '../Organisms/ProductionAddModal.jsx';
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

    return (
        <div>
            <NavBar username="여우" totalBalance="30000" />
            <div className={styles.container}>
                <div className={styles.title}>
                    <ProductionTitle title="채용 공고" size={25} />
                </div>
                {identity === 'TC' && <ProductionAddModal />}
            </div>
            {/* Conditional rendering based on the identity state */}
            {identity === 'ST' ? (
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
