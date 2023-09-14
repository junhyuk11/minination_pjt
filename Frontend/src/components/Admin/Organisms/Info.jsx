import React, { useState } from 'react';
import InfoRow from '../Molecules/InfoRow.jsx';
import DropDown2 from '../../Common/Atoms/DropDown2.jsx';
import RowInput from '../Atoms/RowInput.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import RowDescription from '../Atoms/RowDescription.jsx';
import Modal1 from './Modal1.jsx';

const Info = () => {
    const [dropdownStates, setDropdownStates] = useState({
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
    });
    const [selectedDay, setSelectedDay] = useState('월요일');
    const [selectedIncomeTax, setSelectedIncomeTax] = useState(10); // 예시로 10%로 초기화
    const [selectedVAT, setSelectedVAT] = useState(5); // 예시로 5%로 초기화
    const [inputText, setInputText] = useState(''); // 국가명 입력값을 관리할 상태 추가
    const [currencyInputText, setCurrencyInputText] = useState(''); // 화폐명 입력값을 관리할 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { navigateToDashboard } = useNavigation();

    const closeOtherDropdowns = currentDropdown => {
        const updatedDropdownStates = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in dropdownStates) {
            if (key === currentDropdown) {
                updatedDropdownStates[key] = true;
            } else {
                updatedDropdownStates[key] = false;
            }
        }
        setDropdownStates(updatedDropdownStates);
    };

    const handleDayChange = value => {
        setSelectedDay(value);
    };

    const handleIncomeTaxChange = value => {
        setSelectedIncomeTax(value);
    };

    const handleVATChange = value => {
        setSelectedVAT(value);
    };

    const handleInputTextChange = value => {
        setInputText(value); // 국가명 입력값 업데이트
    };

    const handleCurrencyInputTextChange = value => {
        setCurrencyInputText(value); // 화폐명 입력값 업데이트
    };

    const handleCompleteClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClick = () => {
        // 모달을 닫는 함수
        setIsModalOpen(false);
        navigateToDashboard();
    };

    const hrStyle = {
        width: '80%',
        height: '1px',
        background: 'grey',
    };

    const infoRowStyle = {
        fontWeight: 'bold',
    };

    return (
        <div>
            <hr style={hrStyle} />
            <div style={infoRowStyle}>
                <InfoRow
                    title="국가명"
                    secondComp={
                        <RowInput
                            text={inputText}
                            onTextChange={handleInputTextChange}
                        />
                    }
                    thirdComp={
                        <RowDescription
                            text="한글, 영문, 숫자 혼용가능 
                    (한글 기준 8자 이내)"
                        />
                    }
                />
                <InfoRow
                    title="화폐명"
                    secondComp={
                        <RowInput
                            text={currencyInputText}
                            onTextChange={handleCurrencyInputTextChange}
                        />
                    }
                    thirdComp={<RowDescription text="한글 2자 이내" />}
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
                            selectedValue={selectedDay}
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
                            selectedValue={`${selectedIncomeTax}%`}
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
                            selectedValue={`${selectedVAT}%`}
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
            {/* 모달을 표시하는 로직 */}
            {isModalOpen && (
                <Modal1
                    handleClick={handleModalClick}
                    selectedDay={selectedDay}
                    selectedIncomeTax={selectedIncomeTax}
                    selectedVAT={selectedVAT}
                    inputText={inputText}
                    currencyInputText={currencyInputText}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default Info;
