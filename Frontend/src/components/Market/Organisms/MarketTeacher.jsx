import React, { useState } from 'react';
import './MarketTeacher.css';
import Swal from 'sweetalert2';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import MarketModal2 from './MarketModal2.jsx';

const MarketTeacher = () => {
    const handleDelete = () => {
        Swal.fire('상품이 삭제되었습니다');
        // 상품의 이름으로 삭제요청
    };

    const transactions = [
        {
            id: 1,
            product: '청구계좌',
            description: '식비',
            price: 5000,
            amount: '-',
            button: <ButtonMiddle1 title="삭제하기" onClick={handleDelete} />,
        },
    ];

    // 모달의 상태를 관리하는 state
    const [isModal2Visible, setModal2Visible] = useState(false);

    // 모달을 보여주는 함수
    const showModal2 = () => {
        setModal2Visible(true);
    };

    // 모달을 숨기는 함수
    const hideModal2 = () => {
        setModal2Visible(false);
    };

    return (
        <div>
            <div className="marketRightText">
                <ButtonMiddle1 title="물품추가" onClick={showModal2} />
            </div>
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
            {isModal2Visible && <MarketModal2 hideModal={hideModal2} />}
        </div>
    );
};

export default MarketTeacher;
