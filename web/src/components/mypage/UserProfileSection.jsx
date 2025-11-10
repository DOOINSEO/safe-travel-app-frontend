import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * '내 정보' 페이지 상단에 사용자 프로필과 '계정 관리' 페이지로 이동하는 링크를 표시합니다.
 *
 * @example
 * <UserProfileSection userName="홍길동" />
 */
export default function UserProfileSection({ userName }) {
    const navigate = useNavigate();

    return (
        <section className="px-[20px] pt-5 pb-[13px]">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{userName}님,</h2>
                    <p className="mt-1 text-sm text-gray-500">세이프팡팡에 오신 것을 환영합니다.</p>
                </div>
                <button
                    onClick={() => navigate('/account')}
                    className="flex items-center text-sm text-gray-400"
                    aria-label="계정 관리 페이지로 이동"
                >
                    계정 관리
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </section>
    );
}