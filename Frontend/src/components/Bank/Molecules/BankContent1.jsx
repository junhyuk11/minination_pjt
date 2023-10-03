import React, { useState, useEffect } from 'react';
import './BankContent1.css';
import useBankApi from '../../../api/useBankApi.jsx';

function BankContent1() {
    const [bankList, setBankList] = useState([]);

    const getBankList = async () => {
        try {
            const response = await useBankApi.bankGetBank();
            if (response.code === 200) {
                console.log(response.data.detail);
                setBankList(response.data.detail);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        getBankList();
    }, []);

    return (
        <div className="bankContentTableWrapper">
            <table border="1">
                <thead>
                    <tr>
                        <th>입출금처</th>
                        <th>분류</th>
                        <th>입출금금액</th>
                        <th>잔액</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {bankList
                        .map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.org}</td>
                                <td>{detail.category}</td>
                                <td>{detail.amount}</td>
                                <td>{detail.balance}</td>
                                <td>{detail.date}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankContent1;
