import React from 'react';
import './BankContent1.css';

function BankContent1() {
    const transactions = [
        {
            id: 1,
            account: '청구계좌',
            category: '식비',
            amount: 5000,
            balance: 95000,
            date: '2023-09-19',
        },
    ];

    return (
        <div className="tableWrapper">
            <table border="1">
                <thead>
                    <tr>
                        <th>상품이름</th>
                        <th>분류</th>
                        <th>기간</th>
                        <th>원금</th>
                        <th>수령예상금</th>
                        <th>가입하기</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.account}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.balance}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankContent1;
