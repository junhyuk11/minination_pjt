/* 헌법 */
import React from 'react';
import ConstitutionRow from '../Molecules/ConstitutionRow';
import HomeCard from '../Molecules/HomeCard';

const Constitution = () => {
    const response = {
        nationName: '개발의 민족',
        currency: '미소',
        tax: {
            incomeTax: '12',
            vat: '10',
        },
        payday: 'mon',
        population: '20',
    };
    const { nationName, currency, tax, payday, population } = response;

    const contentDom = (
        <>
            <ConstitutionRow
                number={1}
                content={`국가 이름은 ${nationName} 으로 한다.`}
            />
            <ConstitutionRow
                number={2}
                content={`소득세는 ${tax.incomeTax} 이다.`}
            />
            <ConstitutionRow
                number={3}
                content={`부가가치세는 ${tax.vat} 이다.`}
            />
            <ConstitutionRow
                number={4}
                content={`화폐 단위는 ${currency} 로 한다.`}
            />
            <ConstitutionRow
                number={5}
                content={`주급 지급일은 ${payday} 로 한다.`}
            />
            <ConstitutionRow
                number={6}
                content={`인구수는 ${population}명 이다.`}
            />
        </>
    );

    return (
        <div>
            <HomeCard title="헌법" content={contentDom} />
        </div>
    );
};

export default Constitution;
