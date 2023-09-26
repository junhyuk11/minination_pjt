import React, { useState, useEffect } from 'react';
import './MarketTeacher.css';
import Swal from 'sweetalert2';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import MarketModal2 from './MarketModal2.jsx';

import useShopApi from '../../../api/useShopApi.jsx';

const MarketTeacher = () => {
    const handleDelete = () => {
        Swal.fire('상품이 삭제되었습니다');
        // 상품의 이름으로 삭제요청
    };

    const [productList, setProductList] = useState([]);

    const getProductList = async () => {
        try {
            const response = await useShopApi.shopGetList();
            if (response.status === 200) {
                setProductList(response.resultData);
            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.log('catch error 발생');
        }
    };

    const transformProductToTransaction = (product, id) => {
        return {
            id,
            product: product.product,
            desc: product.desc,
            price: product.price,
            amount: '-',
            button: <ButtonMiddle1 title="삭제하기" onClick={handleDelete} />,
        };
    };

    const transactions = productList.map((product, index) =>
        transformProductToTransaction(product, index + 1),
    );

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

    useEffect(() => {
        getProductList();
    }, []);

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
                                <td>{transaction.desc}</td>
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
