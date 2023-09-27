import React, { useEffect } from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import styles from './Office.module.css';
import Title from '../Atoms/AdminTitle.jsx';
import backgroundImage from '../../../assets/images/office.png';
import InfoRow from '../Molecules/InfoRow.jsx';
import RowTitle from '../Atoms/RowTitle.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import useLawApi from '../../../api/useLawApi.jsx';

const Office = () => {
    const countryName = '개발의민족';
    const selectedDay = '월요일';
    const currencyName = '메소';
    const selectedIncomeTax = 10;
    const selectedVAT = 5;
    const { navigateToOfficeFix } = useNavigation();

    const { nationName, currency, tax, payday } = response;

    const getLawApi = async () => {
        const response = await useLawApi.lawGetInfo();
        if (response.code === 200) {
            setResponse(response.data);
        }
    };

    useEffect(() => {
        getLawApi();
    }, []);

    const dayMappings = {
        MON: '월요일',
        TUE: '화요일',
        WED: '수요일',
        THU: '목요일',
        FRI: '금요일',
        SAT: '토요일',
        SUN: '일요일',
    };

    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
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
                    <Title title="집무실" size="40" />
                </div>
                <div className={styles.info}>
                    <div className={styles.content}>
                        <Title title="국가정보" />
                        <hr style={{ border: '1px solid black' }} />
                        <InfoRow
                            title="국가명"
                            secondComp={<RowTitle text={nationName} />}
                        />
                        <InfoRow
                            title="화폐명"
                            secondComp={<RowTitle text={currency} />}
                        />
                        <InfoRow
                            title="주급 수령일"
                            secondComp={<RowTitle text={payday} />}
                        />
                        <InfoRow
                            title="소득세"
                            secondComp={<RowTitle text={`${tax}%`} />}
                        />
                        <InfoRow
                            title="부가가치세"
                            secondComp={<RowTitle text={`${selectedVAT}%`} />}
                        />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <ButtonMiddle1
                                title="수정하기"
                                onClick={navigateToOfficeFix}
                                style={{ marginLeft: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Office;
