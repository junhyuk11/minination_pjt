import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { identityState } from '../../../recoil/atoms.jsx';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import ProductionTitle from '../Atoms/ProductionTitle.jsx';
import ProductionStudent from '../Organisms/ProductionStudent.jsx';
import ProductionTeacher from '../Organisms/ProductionTeacher.jsx';
import ProductionAddModal from '../Organisms/ProductionAddModal.jsx';
import styles from './JobPosting.module.css';
import useJobApi from '../../../api/useJobApi.jsx';

const JobPosting = () => {
    const [identity, setIdentity] = useRecoilState(identityState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [response, setResponse] = useState([
        // api요청 응답 전 렌더링 해줄 임시값
        {
            name: '직업명',
            desc: '직업설명',
            pay: '급여',
            recruit_total_count: '',
            apply_count: '',
            requirement: '자격',
            employees: ['근무자'],
            status: '0',
        },
    ]);

    // api 요청
    const getLawApi = async () => {
        const res = await useJobApi.jobGetList();
        if (res.code === 200) {
            setResponse(res.data);
        }
    };

    // mount시 api요청을 보낸다
    useEffect(() => {
        getLawApi();
    }, []);

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
                <ProductionStudent jobList={response} />
            ) : (
                <ProductionTeacher
                    jobList={response}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default JobPosting;
