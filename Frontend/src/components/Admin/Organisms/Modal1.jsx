/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import styles from './Modal1.module.css'; // CSS 모듈 가져오기
import AdminTitle from '../Atoms/AdminTitle.jsx';
import useNationApi from '../../../api/useNationApi.jsx';

const Modal1 = ({
    handleClick,
    payday,
    incomeTax,
    vat,
    nationName,
    currency,
    setIsModalOpen,
}) => {
    const [selectedFlag, setSelectedFlag] = useState(null);
    const [flags, setFlags] = useState([]); // 국기 정보를 저장할 상태

    useEffect(() => {
        // API를 통해 국기 정보를 가져오는 함수를 호출합니다.
        const fetchFlags = async () => {
            try {
                const response = await useNationApi.nationGetFlaglist();
                if (response.code === 200) {
                    setFlags(response.data);
                } else {
                    console.error('Failed to fetch flags');
                }
            } catch (error) {
                console.error('Error fetching flags:', error);
            }
        };
        // 국기 정보를 가져오는 함수를 호출합니다.
        fetchFlags();
    }, []); // 컴포넌트가 처음 렌더링될 때만 호출

    const handleFlagClick = flagNumber => {
        if (selectedFlag === flagNumber) {
            setSelectedFlag(null);
        } else {
            setSelectedFlag(flagNumber);
        }
    };
    // 요일 데이터 가공
    const dayMappings = {
        월요일: 'MON',
        화요일: 'TUE',
        수요일: 'WED',
        목요일: 'THU',
        금요일: 'FRI',
        토요일: 'SAT',
        일요일: 'SUN',
    };

    const handleAcceptClick = async () => {
        if (selectedFlag === null) {
            alert('국기를 선택하세요.');
            return;
        }

        try {
            const selectedFlagIndex = selectedFlag - 1;
            const flagImgUrl = flags[selectedFlagIndex]?.flag;

            if (!flagImgUrl) {
                alert('선택한 국기의 이미지 URL을 가져올 수 없습니다.');
                return;
            }

            const response = await useNationApi.nationPostCreate(
                nationName,
                currency,
                dayMappings[payday],
                String(incomeTax),
                String(vat),
                flagImgUrl,
            );

            if (response.code === 200) {
                alert('국가가 성공적으로 생성되었습니다.');
                // 모달을 닫고 메인으로 이동시키는 함수
                handleClick();
            }
        } catch (error) {
            if (error.code === 402) {
                alert('선생님 접근 가능한 기능입니다.');
            } else if (error.code === 403) {
                alert('유효하지 않은 토큰입니다.');
            } else if (error.code === 404) {
                alert('국가 생성에 실패하였습니다.');
            } else if (error.code === 409) {
                alert('이미 생성한 국가가 있습니다.');
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    const handleCloseClick = () => {
        setIsModalOpen(false); // Close the modal
    };
    const FlagWithCheck = ({
        flagNumber,
        selected,
        onClick,
        flagUrl,
        checkedFlagUrl,
    }) => {
        const isChecked = selected === flagNumber;
        return (
            <div
                className={`${styles.flag} ${
                    isChecked ? styles.selectedFlag : ''
                }`}
                onClick={() => onClick(flagNumber)}
            >
                {isChecked ? (
                    <img
                        src={checkedFlagUrl}
                        alt={`Flag ${flagNumber}`}
                        className={styles.flagImage}
                    />
                ) : (
                    <img
                        src={flagUrl}
                        alt={`Flag ${flagNumber}`}
                        className={styles.flagImage}
                    />
                )}
            </div>
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modalCard}>
                <button
                    className={styles.closeButton}
                    onClick={handleCloseClick}
                    type="button"
                >
                    X
                </button>
                <AdminTitle title="국기 선택" className={styles.modalTitle} />
                <div className={styles.modalCards}>
                    {flags.slice(0, 5).map((flag, index) => (
                        <FlagWithCheck
                            key={index}
                            flagNumber={index + 1}
                            selected={selectedFlag}
                            onClick={handleFlagClick}
                            flagUrl={flag.flag}
                            checkedFlagUrl={flag.checkedFlag}
                        />
                    ))}
                </div>
                <div className={styles.modalCards}>
                    {flags.slice(5, 10).map((flag, index) => (
                        <FlagWithCheck
                            key={index}
                            flagNumber={index + 6}
                            selected={selectedFlag}
                            onClick={handleFlagClick}
                            flagUrl={flag.flag}
                            checkedFlagUrl={flag.checkedFlag}
                        />
                    ))}
                </div>
                <button
                    className={styles.modalButton}
                    onClick={handleAcceptClick}
                    type="button"
                >
                    확인
                </button>
                <div>
                    API로 넘겨줄 정보: <br /> 국가명 : {nationName}, 화폐명 :{' '}
                    {currency}, 수령일 : {payday}, 소득세 : {incomeTax},
                    부가가치세 : {vat}, 선택한 국기 번호 : {selectedFlag}
                </div>
            </div>
        </div>
    );
};

export default Modal1;
