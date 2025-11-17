import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { useLogin } from '../hooks/useLogin';

/**
 * 사용자 로그인을 위한 UI를 렌더링하는 페이지 컴포넌트입니다.
 */
export default function LogIn() {
    const navigate = useNavigate();
    const location = useLocation(); // useLocation 훅 사용
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser, isLoading, error } = useLogin();

    // ProtectedRoute에서 넘겨준 state에서 원래 목적지 경로를 가져옵니다.
    // 만약 state가 없으면 기본값으로 메인 페이지('/')를 사용합니다.
    const from = location.state?.from?.pathname || '/';

    const handleLoginIdChange = (e) => {
        setLoginId(e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
    };

    // loginUser 함수를 async/await로 변경하여 성공 여부를 기다립니다.
    const handleLogin = async (e) => {
        e.preventDefault();

        // useLogin 훅이 성공적으로 로그인을 처리했는지 확인
        const success = await loginUser(loginId, password);

        if (success) {
            // 로그인 성공 시, 원래 가려던 페이지(from)로 이동합니다.
            navigate(from, { replace: true });
        }
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