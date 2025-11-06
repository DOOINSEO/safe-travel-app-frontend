import React from 'react';

/**
 * @description 인증 관련 페이지(로그인, 회원가입 등)의 전체적인 UI 레이아웃을 제공하는 래퍼(Wrapper) 컴포넌트입니다.
 *              이 컴포넌트를 사용하면 모든 인증 페이지가 일관된 디자인(상단 여백, 중앙 정렬, 너비 등)을 유지할 수 있습니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.title - 페이지 상단에 표시될 주 제목 (예: "로그인하기")
 * @param {React.ReactNode} props.children - 레이아웃 내부에 렌더링될 자식 요소들 (일반적으로 form 태그가 위치합니다)
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
        // 페이지 전체를 감싸는 최상위 div. 화면 전체 높이를 차지하고, 내부 컨텐츠를 수평 중앙 정렬합니다.
        <div className="flex min-h-screen flex-col items-center bg-white px-[45px]">

            {/*
              페이지 상단부터 폼 제목까지의 고정된 수직 여백을 만들기 위한 'Spacer' div 입니다.
              이 div의 높이를 조절하여 전체 폼 블록의 세로 위치를 조정할 수 있습니다.
            */}
            <div className="h-[161px] flex-shrink-0" />

            {/*
              실제 컨텐츠(제목, 폼)를 담는 컨테이너입니다.
              너비가 300px로 고정됩니다.
              flex-col과 gap-[57px]를 사용하여, 자식 요소인 제목(h1)과 폼(children) 사이에
              정확히 57px의 수직 간격을 만듭니다.
            */}
            <div className="flex w-[300px] flex-col items-center gap-[57px]">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {children}
            </div>
        </div>
    );
}