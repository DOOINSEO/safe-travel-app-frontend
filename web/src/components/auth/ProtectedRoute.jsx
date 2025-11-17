import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 로그인이 필요한 페이지를 감싸는 보호된 라우트 컴포넌트입니다.
 *
 * @param {{ children: React.ReactNode }} props - 렌더링할 자식 컴포넌트(페이지)
 * @returns {React.ReactElement} - 로그인 상태에 따라 자식 컴포넌트 또는 로그인 페이지로의 리디렉션을 반환합니다.
 */
export default function ProtectedRoute({ children }) {
    const location = useLocation();

    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem('token');

    // 토큰이 없으면 (로그인되지 않은 상태이면)
    if (!token) {
        // 현재 사용자가 가려던 경로(location.pathname)를 state에 담아 로그인 페이지로 보냅니다.
        // 이렇게 하면 로그인 성공 후 원래 가려던 페이지로 돌아오게 할 수 있습니다.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 토큰이 있으면 (로그인된 상태이면) 요청한 페이지(children)를 그대로 보여줍니다.
    return children;
}