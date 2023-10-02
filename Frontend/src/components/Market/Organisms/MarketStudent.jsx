import React, { useState, useEffect } from 'react';
import './MarketStudent.css';
import Swal from 'sweetalert2';
import InputNumber1 from '../../Common/Atoms/InputNumber1.jsx';
import ButtonSmall1 from '../Atoms/MarketButtonSmall.jsx';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import useShopApi from '../../../api/useShopApi.jsx';
import useBankApi from '../../../api/useBankApi.jsx';

const MarketStudent = () => {
    const { navigateToLogin } = useNavigation();
    const [purchaseList, setPurchaseList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [cash, setCash] = useState({});

    const getProductList = async () => {
        try {
            const response = await useShopApi.shopGetList();
            if (response.code === 200) {
                setProductList(response.data);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            navigateToLogin();
        }
    };

    const getCash = async () => {
        try {
            const response = await useBankApi.bankGetBank();
            if (response.code === 200) {
                setCash(response.data.asset.cash);
            } else {
                console.log('리스폰', response.code);
            }
        } catch (error) {
            navigateToLogin();
        }
    };

    const getPurchaseList = async () => {
        try {
            const response = await useShopApi.shopGetPurchase();
            if (response.code === 200) {
                setPurchaseList(response.data);
            } else {
                console.log(response.code);
            }
        } catch (error) {
            navigateToLogin();
        }
    };

    const handleQuantityChange = (productId, amount) => {
        setQuantity(prev => ({
            ...prev,
            [productId]: parseInt(amount, 10) || 0,
        }));
    };

    const handleBuy = async product => {
        try {
            const amount = quantity[product.id];
            const productData = { product: product.product, amount };
            const response = await useShopApi.shopPostBuy(productData);
            console.log('response check.....');
            if (response.code === 200) {
                Swal.fire('상품을 구매하였습니다').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else if ('response.code === 406') {
                Swal.fire('잔액이 부족합니다!');
            }
        } catch (error) {
            console.log('loginform error: ', error.response);
        }
    };

    const handleUse = async product => {
        try {
            const productData = {
                product: product.product,
            };
            const response = await useShopApi.shopPostUse(productData);
            if (response.code === 200) {
                Swal.fire('상품을 사용하였습니다').then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                console.log('상품 사용 실패:', response.code);
            }
        } catch (error) {
            console.error('상품 사용 중 오류 발생:', error);
        }
    };

    const transformProductToTransaction = product => {
        return {
            id: product.id,
            product: product.product,
            desc: product.desc,
            price: product.price,
            amount: (
                <InputNumber1
                    onChange={value => handleQuantityChange(product.id, value)}
                />
            ),
            button: (
                <ButtonSmall1
                    title="구매하기"
                    onClick={() => handleBuy(product)}
                />
            ),
        };
    };

    const transformPurchaseToDisplayItem = item => {
        return {
            id: item.id,
            product: item.product,
            desc: item.desc,
            price: item.price,
            amount: item.amount,
            button: (
                <ButtonSmall1
                    title="사용하기"
                    onClick={() => handleUse(item)}
                />
            ),
        };
    };

    const transactions = productList.map((product, index) =>
        transformProductToTransaction(product, index + 1),
    );

    const displayPurchases = purchaseList.map((item, index) =>
        transformPurchaseToDisplayItem(item, index + 1),
    );

    useEffect(() => {
        getProductList();
        getPurchaseList();
        getCash();
    }, []);

    return (
        <div>
            <div className="marketRightText2">
                {`사용가능한 금액 : ${cash}`}
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
                                <td>{transaction.desc}</td>
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
                        {displayPurchases.map(item => (
                            <tr key={item.id}>
                                <td>{item.product}</td>
                                <td>{item.desc}</td>
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
