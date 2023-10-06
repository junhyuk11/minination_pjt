import React from 'react';
import Swal from 'sweetalert2';
import ProductionButton2 from '../Atoms/ProductionButton2.jsx';
import styles from './ProductionAddModal.module.css';
import useJobApi from '../../../api/useJobApi.jsx';

const ProductionAddModal = () => {
    const handleAddClick = async () => {
        Swal.fire({
            title: '직업 추가하기',
            html: `
                <hr>
                <div>직업명: <input id="name" type="text" style="border-radius: 10px; height: 30px;"></div>
                <br>
                <div>직업 설명: <input id="desc" type="text" style="border-radius: 10px; height: 30px;"></div>
                <br>
                <div>주급: <input id="pay" type="number" style="border-radius: 10px; height: 30px;"> 만</div>
                <br>
                <div>모집인원: <input id="recruitTotalCount" type="number" style="border-radius: 10px; height: 30px;"> 명</div>
                <br>   
                <div>자격요건: <input id="requirement" type="text" style="border-radius: 10px; height: 30px;"></div>
                <hr>
                <style>
                input {
                    border: 1px solid #d8d8d8;
                    text-align: center;
                    font-size: 20px;
                    width: 100px;
                }
                input[type="number"] {
                    background-image: url('data:image/svg+xml;utf8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%220%200%2050%2067%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20stroke-width%3D%222%22%3E%3Cline%20x1%3D%221%22%20x2%3D%2250%22%20y1%3D%2233.5%22%20y2%3D%2233.5%22%20stroke%3D%22%23D8D8D8%22%2F%3E%3Cpolyline%20transform%3D%22translate(25%2020)%20rotate(45)%20translate(-25%20-20)%22%20points%3D%2219%2026%2019%2014%2032%2014%22%20stroke%3D%22%23000%22%2F%3E%3Cpolyline%20transform%3D%22translate(25%2045)%20rotate(225)%20translate(-25%20-45)%22%20points%3D%2219%2052%2019%2039%2032%2039%22%20stroke%3D%22%23000%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
                    background-position: center right;
                    background-size: contain;
                    background-repeat: no-repeat;
                    caret-color: transparent;
                }              
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none !important;
                    opacity: 1 !important;
                    background: transparent !important;
                    border-width: 0px;
                    margin: 0;
                    border-left: 1px solid #d8d8d8;
                    height: 34px;
                    width: 23px;
                    cursor: pointer;
                    }
                input[type="text"]:focus,
                input[type="number"]:focus {
                    caret-color: initial; /* 포커스 시 커서의 기본 색상 사용 */
                }
                </style>
                `,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            preConfirm: async () => {
                const name = document.getElementById('name').value;
                const desc = document.getElementById('desc').value;
                const pay = document.getElementById('pay').value;
                const recruitTotalCount =
                    document.getElementById('recruitTotalCount').value;
                const requirement =
                    document.getElementById('requirement').value;

                // 주급 필드가 자연수인지 확인
                if (!Number.isInteger(Number(pay)) || Number(pay) <= 0) {
                    Swal.showValidationMessage('주급은 자연수여야 합니다.');
                    return false;
                }
                // 모집인원 필드가 자연수인지 확인
                if (
                    !Number.isInteger(Number(recruitTotalCount)) ||
                    Number(recruitTotalCount) <= 0
                ) {
                    Swal.showValidationMessage('모집인원은 자연수여야 합니다.');
                    return false;
                }

                try {
                    // API 호출
                    const response = await useJobApi.jobPostRegister(
                        name,
                        desc,
                        pay,
                        recruitTotalCount,
                        requirement,
                    );
                    if (response.code === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: '등록 완료',
                            confirmButtonText: '확인',
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '등록 실패',
                            confirmButtonText: '확인',
                        });
                    }
                } catch (error) {
                    console.error('등록 처리 중 오류 발생:', error);
                    Swal.fire({
                        icon: 'error',
                        title: '등록 처리 중 오류 발생',
                        confirmButtonText: '확인',
                    });
                }
            },
        });
    };
    return (
        <div className={styles.button}>
            <ProductionButton2 onClick={handleAddClick} title="직업 추가하기" />
        </div>
    );
};

export default ProductionAddModal;
