import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation';

const Landing = () => {
    const {
        navigateToFoundation,
        navigateToOffice,
        navigateToOfficeFix,
        navigateToStock,
    } = useNavigation();

    return (
        <div>
            <p>Landing 페이지입니다. 시작해주세요</p>
            <button type="button" onClick={navigateToFoundation}>
                Foundation 페이지로 이동하세요
            </button>
            <button type="button" onClick={navigateToOffice}>
                office 페이지로 이동하세요
            </button>
            <button type="button" onClick={navigateToOfficeFix}>
                officeFix 페이지로 이동하세요
            </button>
            <button type="button" onClick={navigateToStock}>
                stock 페이지로 이동하세요
            </button>
        </div>
    );
};

export default Landing;
