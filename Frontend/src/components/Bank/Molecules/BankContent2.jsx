import React, { useState, useEffect } from 'react';
import './BankContent1.css';
import Swal from 'sweetalert2';
import BankButtonSmall from '../Atoms/BankButtonSmall.jsx';
import BankInput from '../Atoms/BankInput.jsx';
import useBankApi from '../../../api/useBankApi.jsx';

function BankContent2() {
    const [bankList, setBankList] = useState([]);

    const getBankList = async () => {
        try {
            const response = await useBankApi.bankGetBank();
            if (response.code === 200) {
                console.log(response.data.account);
                setBankList(response.data.account);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleDelete = async productType => {
        try {
            const matched = productType.match(/(\d+)개월 (.+)/); 
            if (!matched) return; 

            const term = matched[1]; 
            const type = matched[2].startsWith('예') ? 'DP' : 'SV';

            const subData = { type, term };
            const response = await useBankApi.bankPostTerminate(subData);
            if (response.code === 200) {
                Swal.fire('상품이 해지되었습니다').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                console.log('상품 해지 실패:', response.code);
            }
        } catch (error) {
            console.error('상품 해지 중 오류 발생:', error);
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
                        <th>상품이름</th>
                        <th>가입일</th>
                        <th>만기일</th>
                        <th>원금</th>
                        <th>만기 예상금액</th>
                        <th>가입하기 </th>
                    </tr>
                </thead>
                <tbody>
                    {bankList
                        .filter(account => account.type !== '일반 통장')
                        .map((account, index) => (
                            <tr key={index}>
                                <td>{account.type}</td>
                                <td>{account.start}</td>
                                <td>{account.end}</td>
                                <td>{account.principal}</td>
                                <td>{account.estimation}</td>
                                <td>
                                    <BankButtonSmall
                                        title="해지하기"
                                        onClick={() =>
                                            handleDelete(account.type)
                                        } // Pass the account type to handleDelete
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankContent2;
