import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import styles from './OfficeFix.module.css';
import AdminTitle from '../Atoms/AdminTitle.jsx';
import backgroundImage from '../../../assets/images/office.png';
import InfoRow from '../Molecules/InfoRow.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import RowInput from '../Atoms/RowInput.jsx';
import RowDescription from '../Atoms/RowDescription.jsx';
import DropDown2 from '../../Common/Atoms/DropDown2.jsx'; // DropDown2 컴포넌트 추가
import useLawApi from '../../../api/useLawApi.jsx';
import { identityState } from '../../../recoil/atoms.jsx';

const OfficeFix = () => {
    const [countryName, setCountryName] = useState('');
    const [currencyName, setCurrencyName] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedIncomeTax, setSelectedIncomeTax] = useState('');
    const [selectedVAT, setSelectedVAT] = useState('');
    const [dropdownStates, setDropdownStates] = useState({
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
    });
    const { navigateToOffice, navigateToLogin, navigateToDashboard } =
        useNavigation();
    const [errorMessage, setErrorMessage] = useState('');

    const [identity] = useRecoilState(identityState);

    // 선생님이 아닐경우 메인으로 리디렉션
    if (identity !== 'TC') {
        if (!sessionStorage.getItem('accessToken')) {
            navigateToLogin();
        } else {
            navigateToDashboard();
        }
    }

    // 국가명 유효성 검사
    const isCountryNameValid = value => {
        let totalPoints = 0;
        for (let i = 0; i < value.length; i += 1) {
            const char = value.charAt(i);
            if (/[\p{Script=Hangul}]/u.test(char)) {
                // 한글 문자일 경우 2포인트 추가
                totalPoints += 2;
            } else {
                // 영어 및 숫자일 경우 1포인트 추가
                totalPoints += 1;
            }
        }
        return totalPoints >= 1 && totalPoints <= 16; // 1포인트 이상, 16포인트 이하 허용 (한글기준 1~8자 허용)
    };

    // 화폐명 유효성 검사
    const isCurrencyNameValid = value => {
        return /^[\p{Script=Hangul}]{1,2}$/u.test(value); // 오직 한글로 1~2자 허용
    };

    // 요일 데이터 가공
    const dayMappings = {
        MON: '월요일',
        TUE: '화요일',
        WED: '수요일',
        THU: '목요일',
        FRI: '금요일',
        SAT: '토요일',
        SUN: '일요일',
        월요일: 'MON',
        화요일: 'TUE',
        수요일: 'WED',
        목요일: 'THU',
        금요일: 'FRI',
        토요일: 'SAT',
        일요일: 'SUN',
    };

    // api 요청
    const getLawApi = async () => {
        const res = await useLawApi.lawGetInfo();
        if (res.code === 200) {
            setCountryName(res.data.nationName);
            setCurrencyName(res.data.currency);
            setSelectedDay(dayMappings[res.data.payday]);
            setSelectedIncomeTax(res.data.tax.incomeTax);
            setSelectedVAT(res.data.tax.vat);
        } else if (res.code === 403) {
            navigateToLogin();
        } else if (res.code === 404) {
            console.log('에러코드 404 : 국가정보 불러오기 실패');
            alert('국가정보 불러오기 실패');
        }
    };

    // mount시 api요청을 보낸다
    useEffect(() => {
        getLawApi();
    }, []);

    const closeOtherDropdowns = currentDropdown => {
        const updatedDropdownStates = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(dropdownStates)) {
            if (key === currentDropdown) {
                updatedDropdownStates[key] = true;
            } else {
                updatedDropdownStates[key] = false;
            }
        }
        setDropdownStates(updatedDropdownStates);
    };

    const handleCountryNameChange = value => {
        setCountryName(value);
    };

    const handleCurrencyNameChange = value => {
        setCurrencyName(value);
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

    const handleFinishClick = async () => {
        // 국가명과 화폐명의 유효성 검사
        if (
            !isCountryNameValid(countryName) ||
            !isCurrencyNameValid(currencyName)
        ) {
            setErrorMessage(
                '국가명은 한글 기준 8자 이내이고, 화폐명은 한글 2자 이내이어야 합니다.',
            );
            return;
        }
        // api 요청
        try {
            // api 요청
            await useLawApi.lawPutLaw(
                countryName,
                currencyName,
                dayMappings[selectedDay],
                selectedIncomeTax,
                selectedVAT,
            );
            // 성공적으로 업데이트된 후에 navigate 실행
            navigateToOffice();
        } catch (error) {
            console.error('국가 정보 업데이트 오류:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div
                    style={{
                        paddingTop: '2%',
                        paddingBottom: '1%',
                        textAlign: 'center',
                    }}
                >
                    <AdminTitle title="집무실" size="40" />
                </div>
                <div className={styles.info}>
                    <div className={styles.content}>
                        <AdminTitle title="국가정보" size={30} />
                        <hr style={{ border: '1px solid black' }} />
                        <InfoRow
                            title="국가명"
                            secondComp={
                                <RowInput
                                    text={countryName}
                                    onTextChange={handleCountryNameChange}
                                    width={120}
                                    onKeyPress={handleFinishClick}
                                />
                            }
                            thirdComp={
                                <RowDescription text="한글 기준 8자 이내" />
                            }
                        />
                        <InfoRow
                            title="화폐명"
                            secondComp={
                                <RowInput
                                    text={currencyName}
                                    onTextChange={handleCurrencyNameChange}
                                    width={120}
                                    onKeyPress={handleFinishClick}
                                />
                            }
                            thirdComp={<RowDescription text="한글 2자 이내" />}
                        />
                        {/* 주급 수령일 드롭다운 추가 */}
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
                            thirdComp={<RowDescription text="" />}
                        />
                        <InfoRow
                            title="소득세"
                            secondComp={
                                <DropDown2
                                    options={Array.from(
                                        { length: 101 },
                                        (_, i) => `${i}`,
                                    )} // 0%부터 100%까지 배열 생성
                                    selectedValue={`${selectedIncomeTax}%`}
                                    onValueChange={handleIncomeTaxChange}
                                    isOpen={dropdownStates.dropdown2}
                                    closeOtherDropdowns={() =>
                                        closeOtherDropdowns('dropdown2')
                                    }
                                />
                            }
                            thirdComp={<RowDescription text="" />}
                        />
                        <InfoRow
                            title="부가가치세"
                            secondComp={
                                <DropDown2
                                    options={Array.from(
                                        { length: 101 },
                                        (_, i) => `${i}`,
                                    )}
                                    selectedValue={`${selectedVAT}%`}
                                    onValueChange={handleVATChange}
                                    isOpen={dropdownStates.dropdown3}
                                    closeOtherDropdowns={() =>
                                        closeOtherDropdowns('dropdown3')
                                    }
                                />
                            }
                            thirdComp={<RowDescription text="" />}
                        />
                        {/* 에러 메시지 렌더링 */}
                        {errorMessage && (
                            <div className={styles.errorMessage}>
                                {errorMessage}
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <ButtonMiddle1
                                title="완료"
                                onClick={handleFinishClick}
                                style={{ marginLeft: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeFix;
