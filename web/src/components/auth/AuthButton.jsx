import React from 'react';

/**
 * @description 인증 폼(로그인, 회원가-입)의 메인 제출 버튼입니다.
 *              API 요청 중일 때 비활성화되고 '처리 중...' 텍스트를 표시하는 기능을 내장하고 있습니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.text - 버튼에 표시될 기본 텍스트 (예: "로그인", "회원가입")
 * @param {boolean} props.isLoading - API 요청이 진행 중인지 여부를 나타내는 boolean 값. true일 경우 버튼이 비활성화됩니다.
 *
 * @example
 * // LogIn.jsx에서 사용하는 예시
 * <AuthButton text="로그인" isLoading={isLoading} />
 */

export default function AuthButton({ text, isLoading }) {
    return (
        <button
            // form 내부의 버튼은 기본적으로 type="submit"으로 동작하여, 클릭 시 form의 onSubmit 이벤트를 트리거합니다.
            type="submit"
            // isLoading이 true일 때 버튼을 비활성화하여, 사용자가 요청 중에 여러 번 클릭하는 것을 방지합니다.
            disabled={isLoading}
            // Figma 디자인 시안에 맞춘 스타일 및 비활성화 상태(:disabled)에 대한 스타일을 포함합니다.
            // disabled:bg-gray-400 : 비활성화 시 배경색 변경
            // disabled:cursor-not-allowed : 비활성화 시 마우스 커서 모양 변경
            className="mt-8 h-[56px] w-full rounded-full bg-black text-white font-semibold transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {/*
              isLoading 상태에 따라 버튼에 표시되는 텍스트를 동적으로 변경합니다.
              (삼항 연산자 사용)
            */}
            {isLoading ? '처리 중...' : text}
        </button>
    );
}