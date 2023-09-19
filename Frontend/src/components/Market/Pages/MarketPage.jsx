import React from 'react';
import { useRecoilState } from 'recoil';
import NavBar from '../../Common/Organisms/NavBar.jsx';
import './MarketPage.css';
import { identityState } from '../../../recoil/atoms.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';
import MarketStudent from '../Organisms/MarketStudent.jsx';
import MarketTeacher from '../Organisms/MarketTeacher.jsx';

const MarketPage = () => {
    const [identity, setIdentity] = useRecoilState(identityState);

    const handleButtonClick = buttonName => {
        setIdentity(buttonName);
    };
    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <ButtonMiddle1
                type="button"
                title="선생님이 되어라"
                className={`marketSelectButtonStyle ${
                    identity === 'teacher' ? 'active' : ''
                }`}
                onClick={() => handleButtonClick('teacher')}
            />
            <ButtonMiddle1
                type="button"
                title="학생이 되어라"
                className={`marketSelectButtonStyle ${
                    identity === 'teacher' ? 'active' : ''
                }`}
                onClick={() => handleButtonClick('student')}
            />
            {identity === 'student' && <MarketStudent />}
            {identity === 'teacher' && <MarketTeacher />}
        </div>
    );
};

export default MarketPage;
