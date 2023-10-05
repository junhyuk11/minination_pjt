import React, { useState } from 'react';
import InfoRow from '../Molecules/InfoRow.jsx';
import DropDown2 from '../../Common/Atoms/DropDown2.jsx';
import RowInput from '../Atoms/RowInput.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import RowDescription from '../Atoms/RowDescription.jsx';
import FoundationModal from './FoundationModal.jsx';
import styles from './Info.module.css';

const Info = () => {
    const [dropdownStates, setDropdownStates] = useState({
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
    });
    const [payday, setpayday] = useState('월요일');
    const [incomeTax, setincomeTax] = useState(10); // 예시로 10%로 초기화
    const [vat, setVat] = useState(5); // 예시로 5%로 초기화
    const [nationName, setNationName] = useState(''); // 국가명 입력값을 관리할 상태 추가
    const [currency, setCurrency] = useState(''); // 화폐명 입력값을 관리할 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { navigateToDashboard } = useNavigation();

    const closeOtherDropdowns = currentDropdown => {
        const updatedDropdownStates = {};
        Object.keys(dropdownStates).forEach(key => {
            updatedDropdownStates[key] = key === currentDropdown;
        });
        setDropdownStates(updatedDropdownStates);
    };

    const closeAllDropdowns = () => {
        setDropdownStates({
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
        });
    };

    const handleDayChange = value => {
        setpayday(value);
    };

    const handleIncomeTaxChange = value => {
        setincomeTax(value);
    };

    const handleVATChange = value => {
        setVat(value);
    };

    const handleNationNameChange = value => {
        setNationName(value); // 국가명 입력값 업데이트
    };

    const handlecurrencyChange = value => {
        setCurrency(value); // 화폐명 입력값 업데이트
    };

    const handleCompleteClick = () => {
        closeAllDropdowns();
        setIsModalOpen(true);
    };

    const handleModalClick = () => {
        // 모달을 닫는 함수
        setIsModalOpen(false);
        navigateToDashboard();
    };

    return (
        <div>
            <hr className={styles.hrStyle} />
            <div className={styles.infoRowStyle}>
                <InfoRow
                    title="국가명"
                    secondComp={
                        <RowInput
                            text={nationName}
                            onTextChange={handleNationNameChange}
                            width={100}
                        />
                    }
                    thirdComp={<RowDescription text="한글기준 8자 이내" />}
                />
                <InfoRow
                    title="화폐명"
                    secondComp={
                        <RowInput
                            text={currency}
                            onTextChange={handlecurrencyChange}
                            width={100}
                        />
                    }
                    thirdComp={<RowDescription text="2자 이내 한글" />}
                />
                <InfoRow
                    title="주급 수령일"
                    secondComp={
                        <DropDown2
                            options={[
                                '월요일',
                                '화요일',
                                '수요일',
                                '목요일',
                                '금요일',
                                '토요일',
                                '일요일',
                            ]}
                            selectedValue={payday}
                            onValueChange={handleDayChange}
                            isOpen={dropdownStates.dropdown1}
                            closeOtherDropdowns={() =>
                                closeOtherDropdowns('dropdown1')
                            }
                        />
                    }
                />
                <InfoRow
                    title="소득세"
                    secondComp={
                        <DropDown2
                            options={Array.from({ length: 100 }, (_, i) => i)} // 0%부터 99%까지 배열 생성
                            selectedValue={`${incomeTax}%`}
                            onValueChange={handleIncomeTaxChange}
                            isOpen={dropdownStates.dropdown2}
                            closeOtherDropdowns={() =>
                                closeOtherDropdowns('dropdown2')
                            }
                        />
                    }
                />
                <InfoRow
                    title="부가가치세"
                    secondComp={
                        <DropDown2
                            options={Array.from({ length: 100 }, (_, i) => i)} // 0%부터 99%까지 배열 생성
                            selectedValue={`${vat}%`}
                            onValueChange={handleVATChange}
                            isOpen={dropdownStates.dropdown3}
                            closeOtherDropdowns={() =>
                                closeOtherDropdowns('dropdown3')
                            }
                        />
                    }
                />
            </div>
            <ButtonMiddle1 title="완료" onClick={handleCompleteClick} />
            {/* 배경 모달 */}
            {isModalOpen && (
                <div className={styles.modalBackground}>
                    <FoundationModal
                        handleClick={handleModalClick}
                        payday={payday}
                        incomeTax={incomeTax}
                        vat={vat}
                        nationName={nationName}
                        currency={currency}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            )}
        </div>
    );
};

export default Info;
