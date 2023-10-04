import React, { useEffect, useState } from 'react';

function ButtonRadio1({ setData }) {
    const [selectedOption, setSelectedOption] = useState('ST');

    const handleRadioChange = event => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        setData(selectedOption);
    }, [selectedOption]);

    return (
        <div>
            <label htmlFor="option1">
                <input
                    type="radio"
                    id="option1"
                    value="ST"
                    checked={selectedOption === 'ST'}
                    onChange={handleRadioChange}
                />
                학생
            </label>
            <label htmlFor="option2">
                <input
                    type="radio"
                    id="option2"
                    value="TC"
                    checked={selectedOption === 'TC'}
                    onChange={handleRadioChange}
                />
                선생님
            </label>
        </div>
    );
}

export default ButtonRadio1;
