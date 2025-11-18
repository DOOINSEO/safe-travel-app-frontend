import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { useLogin } from '../hooks/useLogin';
import useAuthStore from '../stores/authStore';

export default function LogIn() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useLogin();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

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
                        onChange={(e) => setLoginId(e.target.value)}
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

                <AuthButton text="로그인" />
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