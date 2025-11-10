import React from 'react';

/**
 * @description 인증 관련 페이지(로그인, 회원가입 등)의 전체적인 UI 레이아웃을 제공하는 래퍼(Wrapper) 컴포넌트입니다.
 *              이 컴포넌트를 사용하면 모든 인증 페이지가 일관된 디자인(상단 여백, 중앙 정렬, 너비 등)을 유지할 수 있습니다.
 */

/** @example  LogIn.jsx 또는 SignUp.jsx에서 사용하는 방법
 * <AuthLayout title="로그인하기">
 *   <form>
 *     { ... 입력창, 버튼 등 ... }
 *   </form>
 * </AuthLayout>
 */

export default function AuthLayout({ title, children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white px-[45px]">
            <div className="h-[161px] flex-shrink-0" />
            <div className="flex w-[300px] flex-col items-center gap-[57px]">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {children}
            </div>
        </div>
    );
}