import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * @description '내 정보' 페이지 상단에 위치하는 사용자 프로필 섹션입니다.
 *              환영 메시지와 함께 '계정 관리' 페이지로 이동하는 링크를 제공합니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.userName - 화면에 표시될 사용자 닉네임
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
                    {/* --- ⚙️ 백엔드 연동: 사용자 닉네임 표시 ⚙️ --- */}
                    {/* 부모 컴포넌트(MyPage.jsx)로부터 받은 userName prop을 표시합니다. */}
                    {/* 나중에 MyPage.jsx에서 실제 사용자 닉네임을 받아오면 이 부분은 자동으로 업데이트됩니다. */}
                    <h2 className="text-xl font-bold text-gray-800">{userName}님,</h2>
                    <p className="mt-1 text-sm text-gray-500">세이프팡팡에 오신 것을 환영합니다.</p>
                </div>
                <button
                    onClick={() => navigate('/account')}
                    className="flex items-center text-sm text-gray-400"
                >
                    계정 관리
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </section>
    );
}