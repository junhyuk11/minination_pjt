import React from 'react';
import './PortFolio.css';

function PortFolio() {
    const holdings = [
        {
            id: 1,
        },
    ];
    return (
        <div class="portfolio-container">
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
                    {holdings.map(transaction => (
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

export default PortFolio;
