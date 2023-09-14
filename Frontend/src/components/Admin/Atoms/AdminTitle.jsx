import React from 'react';

function AdminTitle({ title }) {
    const titleStyle = {
        fontSize: '40px', // 폰트 크기를 40px로 설정
    };
    return <div style={titleStyle}>{title}</div>;
}

export default AdminTitle;
