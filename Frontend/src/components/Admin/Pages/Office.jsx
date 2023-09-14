import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';    
import NavBar from '../../Common/Organisms/NavBar.jsx';
import styles from './Office.module.css';
import Title from '../Atoms/AdminTitle.jsx';
import backgroundImage from '../../../assets/images/Office.png';
import InfoRow from '../Molecules/InfoRow.jsx';
import RowTitle from '../Atoms/RowTitle.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';

const Office = () => {
    const countryName = '개발의민족'
    const selectedDay = '월요일';
    const currencyName = '메소';
    const selectedIncomeTax = 10;
    const selectedVAT = 5;
    const { navigateToOfficeFix} = useNavigation();    
    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className={styles.info}>
                    <div className={styles.content}>
                        <Title title="국가정보"></Title>
                        <hr style={{ border: '1px solid black' }}/>
                        <InfoRow title="국가명" secondComp={<RowTitle text={countryName} /> }></InfoRow>
                        <InfoRow title="화폐명" secondComp={<RowTitle text={currencyName} /> }></InfoRow>
                        <InfoRow title="주급 수령일" secondComp={<RowTitle text={selectedDay} /> }></InfoRow>
                        <InfoRow title="소득세" secondComp={<RowTitle text={`${selectedIncomeTax}%`} /> }></InfoRow>
                        <InfoRow title="부가가치세" secondComp={<RowTitle text={`${selectedVAT}%`} /> }></InfoRow>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <ButtonMiddle1 title="수정하기" onClick={navigateToOfficeFix} style={{ marginLeft: 'auto' }} />
                    </div></div>
                </div>
            </div>
        </div>
    );
};

export default Office;
