import React from 'react';
import NavBar from '../../Common/organisms/NavBar.jsx';

const OfficeFix = () => {
    const username = 'super';

    return (
        <div>
            <NavBar username="준혁" totalBalance="30000" />
            <p>OfficeFix 페이지입니다. 하이하이 {username}</p>
        </div>
    );
};

export default OfficeFix;
