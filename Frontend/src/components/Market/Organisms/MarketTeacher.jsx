import React from 'react';
import './MarketTeacher.css';

const MarketTeacher = () => {
    const transactions = [
        {
            id: 1,
            product: '청구계좌',
            description: '식비',
            price: 5000,
            amount: '-',
            button: '2023-09-19',
        },
    ];

    return (
        <div>
            <div className="marketLeftText">구매할 수 있는 물품</div>
            <div className="marketTeacherTableWrapper">
                <table border="1">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>상품설명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.product}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.button}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MarketTeacher;
