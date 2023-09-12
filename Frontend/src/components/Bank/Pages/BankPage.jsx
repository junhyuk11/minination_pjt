import React from 'react';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import Fox from '../../Common/Organisms/Fox.jsx';
import ButtonLending1 from '../../Common/Atoms/ButtonLending1.jsx';
import ButtonLarge1 from '../../Common/Atoms/ButtonLarge1.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import ButtonSmall1 from '../../Common/Atoms/ButtonSmall1.jsx';
import ButtonRadio1 from '../../Common/Atoms/ButtonRadio1.jsx';
import DropDown1 from '../../Common/Atoms/DropDown1.jsx';
import SavingAccount from '../../Common/Atoms/SavingAccount.jsx';
import InputNumber1 from '../../Common/Atoms/InputNumber1.jsx';

const BankPage = () => {
    const dropDownOptions = [
        { label: '1%', value: '1번' },
        { label: '2%', value: '2번' },
        { label: '3%', value: '3번' },
    ];

    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <p>은행 화면 페이지입니다. </p>
            <Fox comments="미안하다 이거보여줄려고 어그로끌었다 우여우는 진짜 전설이다" />
            <ButtonLending1 title="지금 시작하기" />
            <ButtonLarge1 title="라지 버튼" />
            <ButtonMiddle1 title="중간 버튼" />
            <ButtonSmall1 title="+" />
            <ButtonRadio1 />
            <DropDown1 label="원하는 문구 입력:" options={dropDownOptions} />
            <SavingAccount balance="3000" />
            <InputNumber1 />
        </div>
    );
};

export default BankPage;
