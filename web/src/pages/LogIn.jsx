// src/pages/LogIn.jsx (Refactored)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { useLogin } from '../hooks/useLogin'; // 커스텀 훅 import

/**
 * 사용자 로그인을 위한 UI를 렌더링하는 페이지 컴포넌트입니다.
 * 실제 로그인 로직은 `useLogin` 훅에 위임합니다.
 */
export default function LogIn() {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    // 로그인 관련 비동기 로직과 상태를 훅에서 가져옵니다.
    const { loginUser, isLoading, error } = useLogin();

    /** 아이디 입력 시 한글 입력을 실시간으로 방지합니다. */
    const handleLoginIdChange = (e) => {
        setLoginId(e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
    };

    /** 폼 제출 시 useLogin 훅의 loginUser 함수를 호출합니다. */
    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(loginId, password);
    };

    return (
        <AuthLayout title="로그인하기">
            <form onSubmit={handleLogin} className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center gap-6">
                    <AuthInput
                        id="loginId"
                        label="아이디"
                        type="text"
                        placeholder="아이디 입력"
                        value={loginId}
                        onChange={handleLoginIdChange}
                    />
                    <AuthInput
                        id="password"
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* 에러 메시지 표시 영역 (레이아웃 밀림 방지를 위해 고정 높이 적용) */}
                <div className="mt-4 h-5 text-center">
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <AuthButton text="로그인" isLoading={isLoading} />
                <div className="h-[15px]" />

                <p className="text-sm text-gray-600">
                    계정이 없다면{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="font-bold hover:underline"
                    >
                        회원가입하기
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
}