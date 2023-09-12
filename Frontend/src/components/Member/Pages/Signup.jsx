import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation.jsx';

const Signup = () => {
    const { navigateToFoundation, navigateToNationality } = useNavigation();

    return (
        <div>
            <p>회원가입 페이지입니다. </p>
            <button type="button" onClick={navigateToNationality}>
                학생 회원가입
            </button>
            <button type="button" onClick={navigateToFoundation}>
                선생 회원가입
            </button>
        </div>
    );
};

export default Signup;
