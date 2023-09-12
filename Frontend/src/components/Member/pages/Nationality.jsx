import React, { useState } from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';
import InputSearch1 from '../../Common/atoms/InputSearch1.jsx';

const Nationality = () => {
    const { navigateToDashboard } = useNavigation();

    const [text, setText] = useState('');

    const handleChange = event => {
        setText(event.target.value);
    };

    return (
        <div>
            <p>국적취득 페이지입니다. </p>
            <InputSearch1 text={text} onChange={handleChange} />
            <button type="button" onClick={navigateToDashboard}>
                가입 완료하기
            </button>
        </div>
    );
};

export default Nationality;
