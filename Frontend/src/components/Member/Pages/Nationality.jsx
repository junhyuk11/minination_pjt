// NationalityPage.jsx (Organism)
import React, { useState } from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import joinImg from '../../../assets/images/join.jpg';
import MemberTitle from '../Atoms/MemberTitle.jsx';
import NationalitySearchForm from '../Molecules/NationalitySearchForm.jsx';
import NationalityResult from '../Molecules/NationalityResult.jsx';
import NationalityError from '../Molecules/NationalityError.jsx';
import styles from './Nationality.module.css';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';

const NationalityPage = () => {
    const { navigateToDashboard } = useNavigation();

    const [text, setText] = useState('개발의민족');
    const [presidentText, setPresidentText] = useState('김영석');
    const [presidentName, setPresidentName] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [showPresidentInput, setShowPresidentInput] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSelectButtonClick = () => {
        setShowPresidentInput(true);
        setPresidentName('김영석');
    };

    const handleChange = event => {
        setText(event.target.value);
    };

    const handleClick = async () => {
        try {
            // 실제 API 요청을 보내는 부분
            const response = await fetch(`API_URL?query=${text}`);
            const data = await response.json();

            if (data && data.results.length > 0) {
                const countryName = data.results[0].name;
                setSearchResult(countryName);
            } else {
                setSearchResult('');
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('API 요청 에러:', error);
            setSearchResult('');
        }

        if (text === '개발의민족') {
            setSearchResult('개발의민족');
        } else {
            setSearchResult('');
        }
        setShowPresidentInput(false);
    };

    const handleConfirmButtonClick = () => {
        setErrorMsg('');
        if (presidentName === presidentText) {
            // eslint-disable-next-line no-alert
            alert(`'${text}' 국가에 가입되셨습니다.`);
            navigateToDashboard();
        } else {
            setErrorMsg('대통령 이름이 일치하지 않습니다.');
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <MemberTitle title="국가가입" size={40} />
                <div className={styles.container2}>
                    <img src={joinImg} className={styles.img} alt="" />
                    <div className={styles.info}>
                        <div className={styles.infoContent}>
                            <NationalitySearchForm
                                text={text}
                                onChange={handleChange}
                                onClick={handleClick}
                                className={styles.search}
                            />
                            {searchResult === '' && (
                                <p>해당 이름의 국가가 존재하지 않습니다.</p>
                            )}
                            {searchResult !== null && searchResult !== '' && (
                                <div>
                                    <div className={styles.resultContainer}>
                                        <div>{searchResult}</div>
                                        <ButtonMiddle1
                                            title="선택"
                                            onClick={handleSelectButtonClick}
                                        />
                                    </div>
                                    {showPresidentInput && (
                                        <>
                                            <NationalityResult
                                                searchResult={searchResult}
                                                presidentText={presidentText}
                                                onTextChange={setPresidentText}
                                                onKeyPress={
                                                    handleConfirmButtonClick
                                                }
                                                className={
                                                    styles.presidentInput
                                                }
                                            />
                                            {errorMsg && (
                                                <NationalityError
                                                    errorMsg={errorMsg}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NationalityPage;
