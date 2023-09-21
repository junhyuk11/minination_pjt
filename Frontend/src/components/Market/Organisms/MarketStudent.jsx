import React from 'react';
import './MarketStudent.css';
import ButtonLarge1 from '../../Common/Atoms/ButtonLarge1.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';

const MarketStudent = () => {
    const cash = 20000;
    const transactions = [
        {
            id: 1,
            product: '청구계좌',
            description: '식비',
            price: 5000,
            amount: 95000,
            button: <ButtonMiddle1 title="구매하기" />,
        },
        {
            id: 1,
            product: '청구계좌',
            description: '식비',
            price: 5000,
            amount: 95000,
            button: '2023-09-19',
        },
        {
            id: 1,
            product: '청구계좌',
            description: '식비',
            price: 5000,
            amount: 95000,
            button: '2023-09-19',
        },
    ];

    const purchasedItems = [
        // 예제 데이터
        {
            id: 101,
            product: '사용한 계좌',
            description:
                '간장공장공장장은 간장공장장이고간장공장공장장은 간장공장장이고간장공장공장장은 간장공장장이고간장공장공장장은 간장공장장이고',
            price: 3000,
            amount: 12000,
            button: '2023-09-18',
        },
        {
            id: 102,
            product: '사용한 계좌',
            description: '스낵',
            price: 1500,
            amount: 3000,
            button: '2023-09-17',
        },
        // 필요한만큼 다른 데이터를 추가
    ];

    return (
        <div>
            <div className="marketRightText">
                <ButtonLarge1 title={`사용가능한 금액 : ${cash}`} />
            </div>
            <div className="marketLeftText">구매할 수 있는 물품</div>
            <div className="marketStudentTableWrapper">
                <table border="1">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>상품설명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>구매하기</th>
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
            <div className="marketLeftText">내가 구매한 물품</div>
            <div className="marketStudentTableWrapper">
                <table border="1">
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>상품설명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>사용하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasedItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.amount}</td>
                                <td>{item.button}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MarketStudent;
