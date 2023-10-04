import React, { useState, useEffect } from 'react';
import BankChartRow from '../Molecules/BankChartRow.jsx';
import BankChartContent from '../Molecules/BankChartContent.jsx';
import useBankApi from '../../../api/useBankApi.jsx';

const BankChart = () => {
    const [chartList, setChartList] = useState([]);

    const getChartList = async () => {
        try {
            const response = await useBankApi.bankGetBank();
            if (response.code === 200) {
                console.log('차트리스트 flow', response.data.flow);
                setChartList(response.data.flow);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        getChartList();
    }, []);

    // chartList의 항목이 undefined가 아닌 경우만 처리합니다.
    const transformedData = chartList
        .filter(item => item !== undefined)
        .map(item => ({
            time: item.time,
            value: item.asset, // asset을 value로 변경합니다.
        }));

    // transformedData가 비어있지 않은 경우에만 contentDom을 정의합니다.
    const contentDom =
        transformedData.length > 0 ? (
            <BankChartRow data={transformedData} />
        ) : null;

    return (
        <div>
            <BankChartContent title="내 자산 변동현황" content={contentDom} />
        </div>
    );
};

export default BankChart;
