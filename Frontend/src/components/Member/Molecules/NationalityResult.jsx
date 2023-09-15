import React from 'react';
import MemberTitle from '../Atoms/MemberTitle.jsx';
import RowInput from '../../Admin/Atoms/RowInput.jsx';
import ButtonMiddle1 from '../../Common/Atoms/ButtonMiddle1.jsx';

const NationalityResult = ({
    searchResult,
    presidentText,
    onTextChange,
    onKeyPress,
    className,
}) => {
    const hrStyle = { border: '1px solid grey' };
    const inputContainer = {
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'auto',
    };
    return (
        <div>
            <MemberTitle title={`대통령 성함(${searchResult})`} size="20" />
            <hr style={hrStyle} />
            <div style={inputContainer}>
                <RowInput
                    text={presidentText}
                    onTextChange={onTextChange}
                    onKeyPress={onKeyPress}
                    className={className}
                />
                <ButtonMiddle1 title="확인" onClick={onKeyPress} />
            </div>
        </div>
    );
};

export default NationalityResult;
