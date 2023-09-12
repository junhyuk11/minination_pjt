import React, { useState } from 'react';
import InputBox1 from '../../Common/Atoms/InputBox1.jsx';
import InputBox2 from '../../Common/Atoms/InputBox2.jsx';
import NavBar from '../../Common/Organisms/NavBar.jsx';

const Dashboard = () => {
    // 초기값 설정 가능, setText로 텍스트 변경 가능
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // InputBox1 컴포넌트의 값이 변경될 때마다 text 상태를 업데이트
    const handleChange1 = event => {
        setId(event.target.value);
    };
    const handleChange2 = event => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <p>Dashboard 페이지입니다. </p>
            <InputBox1
                title="아이디"
                placeholder="아이디  "
                inputText={id}
                onChange={handleChange1}
            />
            <br />
            <InputBox2
                title="비밀번호"
                placeholder="비밀번호"
                inputText={password}
                onChange={handleChange2}
            />
        </div>
    );
};

export default Dashboard;
