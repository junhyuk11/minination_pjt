import React, { useState, useEffect } from 'react';
import './BankContent1.css';
import Swal from 'sweetalert2';
import BankButtonSmall from '../Atoms/BankButtonSmall.jsx';
import BankInput from '../Atoms/BankInput.jsx';
import useBankApi from '../../../api/useBankApi.jsx';

function BankContent3() {
    const [bankInfo, setBankInfo] = useState({ deposit: [], saving: [] });
    const [quantity, setQuantity] = useState({});

    const getBankInfo = async () => {
        try {
            const response = await useBankApi.bankGetInfo();
            if (response.code === 200) {
                setBankInfo(response.data);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            // Handle error
        }
    };

    const postBankSubscribe = async (type, term, amount) => {
        try {
            const subData = { type, term: `${term}`, amount: `${amount}` };
            console.log('subdata', subData);
            const response = await useBankApi.bankPostSubscribe(subData);
            if (response.code === 200) {
                Swal.fire('상품가입이 완료되었습니다.').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else if (response.code === 409) {
                Swal.fire('이미 가입한 상품입니다.').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                console.log(response.code);
            }
        } catch (error) {
            console.log(response);
        }
    };

    const handleQuantityChange = (productId, amount) => {
        setQuantity(prev => ({
            ...prev,
            [productId]: parseInt(amount, 10) || 0,
        }));
    };

    const handleBuy = async (productType, productId, term, interest) => {
        const amount = quantity[productId] || 0; // Use the value from state, default to 0 if undefined
        const type = productType === 'deposit' ? 'DP' : 'SV';
        await postBankSubscribe(type, term, amount);
    };

    useEffect(() => {
        getBankInfo();
    }, []);

    return (
        <div className="bankContentTableWrapper">
            <table border="1">
                <thead>
                    <tr>
                        <th>상품이름</th>
                        <th>기간</th>
                        <th>이자율</th>
                        <th>금액</th>
                        <th>가입하기 </th>
                    </tr>
                </thead>
                <tbody>
                    {bankInfo.deposit.map((transaction, index) => (
                        <tr key={'deposit' + index}>
                            <td>정기 예금</td>
                            <td>{transaction.term}달</td>
                            <td>{Number(transaction.interest).toFixed(1)}%</td>
                            <td>
                                <BankInput
                                    onChange={e =>
                                        handleQuantityChange(
                                            'deposit' + index,
                                            e.target.value,
                                        )
                                    }
                                    type="number"
                                />
                            </td>
                            <td>
                                <BankButtonSmall
                                    title="가입하기"
                                    onClick={() =>
                                        handleBuy(
                                            'deposit',
                                            'deposit' + index,
                                            transaction.term,
                                            transaction.interest,
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                    {bankInfo.saving.map((transaction, index) => (
                        <tr key={'saving' + index}>
                            <td>정기 적금</td>
                            <td>{transaction.term}달</td>
                            <td>{Number(transaction.interest).toFixed(1)}%</td>
                            <td>
                                <BankInput
                                    onChange={e =>
                                        handleQuantityChange(
                                            'saving' + index,
                                            e.target.value,
                                        )
                                    }
                                    type="number"
                                />
                            </td>
                            <td>
                                <BankButtonSmall
                                    title="가입하기"
                                    onClick={() =>
                                        handleBuy(
                                            'saving',
                                            'saving' + index,
                                            transaction.term,
                                            transaction.interest,
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankContent3;
