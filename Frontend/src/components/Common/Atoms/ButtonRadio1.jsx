import React, { useState } from 'react';

function ButtonRadio1() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = event => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <label htmlFor="option1">
                <input
                    type="radio"
                    id="option1"
                    value="선생님"
                    checked={selectedOption === '선생님'}
                    onChange={handleRadioChange}
                />
                선생님
            </label>
            <label htmlFor="option2">
                <input
                    type="radio"
                    id="option2"
                    value="학생"
                    checked={selectedOption === '학생'}
                    onChange={handleRadioChange}
                />
                학생
            </label>

            <p>당신의 정체는 {selectedOption} 입니다. </p>
        </div>
    );
}

export default ButtonRadio1;
