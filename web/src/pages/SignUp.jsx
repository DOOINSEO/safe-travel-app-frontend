import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { useSignUpForm } from '../hooks/useSignUpForm';

export default function SignUp() {
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, error, displayPhone } = useSignUpForm();

    return (
        <AuthLayout title="회원가입하기">
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center gap-6">
                    <AuthInput name="loginId" label="아이디" type="text" placeholder="사용할 아이디 입력" value={formData.loginId} onChange={handleChange} />
                    <AuthInput name="password" label="비밀번호" type="password" placeholder="비밀번호 입력" value={formData.password} onChange={handleChange} />
                    <AuthInput name="confirmPassword" label="비밀번호 확인" type="password" placeholder="비밀번호 다시 입력" value={formData.confirmPassword} onChange={handleChange} />
                    <AuthInput name="name" label="이름" type="text" placeholder="이름 입력" value={formData.name} onChange={handleChange} />
                    <AuthInput name="nickname" label="닉네임" type="text" placeholder="닉네임 입력" value={formData.nickname} onChange={handleChange} />
                    <AuthInput name="phone" label="휴대전화번호" type="tel" placeholder="010-1234-5678" value={displayPhone} onChange={handleChange} />

                    <div className="flex w-full items-center gap-2">
                        <input
                            type="checkbox"
                            id="alarmEnabled"
                            name="alarmEnabled"
                            checked={formData.alarmEnabled}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="alarmEnabled" className="text-sm text-gray-700">
                            안전 관련 알림 수신에 동의합니다.
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 h-5 text-center">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <AuthButton text="회원가입" />
                <div className="h-[15px]" />

                <p className="text-sm text-gray-600">
                    이미 계정이 있나요?{' '}
                    <button type="button" onClick={() => navigate('/login')} className="font-bold hover:underline">
                        로그인
                    </button>
                </p>
                <div className="h-10" />
            </form>
        </AuthLayout>
    );
}