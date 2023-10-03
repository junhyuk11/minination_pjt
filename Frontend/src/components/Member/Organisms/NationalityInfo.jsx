import React, { useState } from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import NationalitySearchForm from '../Molecules/NationalitySearchForm.jsx';
import NationalityResult from '../Molecules/NationalityResult.jsx';
import NationalityError from '../Molecules/NationalityError.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import styles from './NationalityInfo.module.css';
import useNationApi from '../../../api/useNationApi.jsx';

const NationalityInfo = () => {
    const { navigateToDashboard } = useNavigation();
    const [nationName, setnationName] = useState('개발의민족');
    const [president, setpresident] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [showPresidentInput, setShowPresidentInput] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // API 요청을 위한 함수
    const fetchNationInfo = async () => {
        try {
            const response = await useNationApi.nationPostSearch(nationName);

            if (response.code === 200) {
                // 검색 결과가 있을 경우
                setSearchResult(nationName);
            } else {
                // 검색 결과가 없을 경우
                setSearchResult('');
                console.log('API 요청 에러');
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
            setSearchResult('');
        }
    };

    const handleSelectButtonClick = () => {
        setShowPresidentInput(true);
    };

    const handleChange = event => {
        setnationName(event.target.value);
    };

    // 국가검색 함수
    const handleClick = () => {
        // 국가 검색 API 요청
        setErrorMsg('');
        fetchNationInfo();
        setShowPresidentInput(false);
    };

    const handleConfirmButtonClick = async () => {
        setErrorMsg('');

        try {
            // 대통령 이름 확인 API 요청
            const response = await useNationApi.nationPostPresident(
                searchResult,
                president,
            );

            const statusCode = response.code;
            if (statusCode === 200) {
                // 대통령 이름이 일치하는 경우
                const joinResponse =
                    await useNationApi.nationPostJoin(searchResult);
                if (joinResponse.code === 200) {
                    // 국가 가입 성공
                    alert(`'${searchResult}' 국가에 가입되셨습니다.`);
                    navigateToDashboard();
                } else if (joinResponse.code === 409) {
                    setErrorMsg('이미 가입 중인 국가입니다.');
                } else {
                    setErrorMsg('국가 가입 중에 오류가 발생했습니다.');
                }
            } else if (statusCode === 400) {
                setErrorMsg('대통령 이름이 일치하지 않습니다.');
            } else {
                setErrorMsg('서버 오류가 발생했습니다.');
            }
        } catch (error) {
            // console.log(error.response.data.status);
            if (error.response.data.status === 404) {
                console.log('API 요청실패, 코드 404');
            } else if (error.response.data.status === 403) {
                console.log('API 요청실패, 코드 403 : 유효하지 않은 토큰');
            } else {
                console.error('API 요청 에러:', error);
                setErrorMsg('API 요청 중에 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className={styles.info}>
            <div className={styles.infoContent}>
                <NationalitySearchForm
                    text={nationName}
                    onChange={handleChange}
                    onClick={handleClick}
                    className={styles.search}
                />
                {searchResult === '' && (
                    <p>해당 이름의 국가가 존재하지 않습니다.</p>
                )}
                {searchResult !== null && searchResult !== '' && (
                    <div className={styles.resultSplitter}>
                        <div className={styles.resultContainer}>
                            <div>{searchResult}</div>
                            <ButtonMiddle1
                                title="선택"
                                onClick={handleSelectButtonClick}
                                height={40}
                                width={70}
                            />
                        </div>
                        {showPresidentInput && (
                            <>
                                <NationalityResult
                                    president={president}
                                    onTextChange={setpresident}
                                    onKeyPress={handleConfirmButtonClick}
                                />
                                {errorMsg && (
                                    <NationalityError errorMsg={errorMsg} />
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NationalityInfo;
