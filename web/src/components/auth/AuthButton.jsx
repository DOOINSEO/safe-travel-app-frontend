import React from 'react';

/**
 * @description 인증 폼(로그인, 회원가입)의 메인 제출 버튼입니다.
 *              API 요청 중일 때 비활성화되고 '처리 중...' 텍스트를 표시하는 기능을 내장하고 있습니다.
 *
 * @example
 * // LogIn.jsx에서 사용하는 예시
 * <AuthButton text="로그인" isLoading={isLoading} />
 */

export default function AuthButton({ text, isLoading }) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="mt-8 h-[56px] w-full rounded-full bg-black text-white font-semibold transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {isLoading ? '처리 중...' : text}
        </button>
    );
}
