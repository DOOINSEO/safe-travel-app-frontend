import React from 'react';
import { useNavigate } from 'react-router-dom';

function TempHomePage() {
    const navigate = useNavigate();

    // 버튼 스타일 (임시 느낌)
    const buttonStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        gap: '0.5rem',
        border: '1px dashed #ccc',
        borderRadius: '8px',
        background: '#fafafa',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '1rem',
        color: '#333'
    };

    const infoPanelStyle = {
        border: '2px dashed #a2a2a2',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '2rem'
    };

    return (
        <div style={{ padding: '1rem' }}>
            <div style={infoPanelStyle}>
                <h3>[임시] 정보 패널</h3>
                <p>현재 날씨, 현재 지역 안전 평가 표시 영역</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <button style={buttonStyle} onClick={() => alert('구현 예정')}>🏢<br/>주요 기관</button>
                <button style={buttonStyle} onClick={() => alert('구현 예정')}>🗺️<br/>지도</button>
                <button style={buttonStyle} onClick={() => navigate('/mypage')}>👤<br/>마이페이지</button>
                <button style={buttonStyle} onClick={() => alert('구현 예정')}>🆘<br/>원클릭 문자</button>
                <button style={buttonStyle} onClick={() => navigate('/pictogram')}>🎨<br/>픽토그램</button>
                <button style={buttonStyle} onClick={() => navigate('/board')}>📋<br/>게시판</button>
                <button style={buttonStyle} onClick={() => alert('구현 예정')}>🔔<br/>알림</button>
            </div>
        </div>
    );
}

export default TempHomePage;