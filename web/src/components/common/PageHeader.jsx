import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react'; // Home 아이콘 import

/**
 * @description 앱 전반에서 사용되는 공통 페이지 헤더입니다.
 *              좌측에는 유연한 뒤로가기 버튼, 우측에는 홈 버튼을 제공하여 탐색 편의성을 높입니다.
 * @param {object} props - 컴포넌트 props
 * @param {string} props.title - 헤더에 표시될 페이지 제목
 * @param {string} [props.backPath] - (선택 사항) 뒤로가기 버튼 클릭 시 이동할 특정 경로. 지정하지 않으면 이전 페이지(-1)로 이동합니다.
 *
 * @example
 * // 1. 기본 뒤로가기 (-1 이전 페이지로 이동)
 * <PageHeader title="픽토그램" />
 *
 * // 2. 특정 경로로 고정하여 이동
 * <PageHeader title="픽토그램 상세" backPath="/pictogram" />
 */

export default function PageHeader({ title, backPath }) {
    const navigate = useNavigate();

    /**
     * 뒤로가기 버튼 클릭 시 실행될 핸들러 함수입니다.
     * backPath prop이 있으면 해당 경로로, 없으면 이전 페이지로 이동합니다.
     */
    const handleBackClick = () => {
        if (backPath) {
            navigate(backPath); // 지정된 경로가 있으면 그곳으로 이동
        } else {
            navigate(-1); // 지정된 경로가 없으면 이전 페이지로 이동
        }
    };

    return (
        <div className="flex h-[38px] items-center justify-between border-b border-gray-200">

            {/* 왼쪽 영역: 뒤로가기 버튼 */}
            <button
                onClick={handleBackClick}
                aria-label="뒤로 가기"
                className="p-2"
            >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>

            {/* 중앙 영역: 페이지 제목 (항상 중앙 정렬) */}
            <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-bold text-gray-800">
                {title}
            </h1>

            {/* 오른쪽 영역: 홈 버튼 */}
            <button
                onClick={() => navigate('/')} // 항상 홈('/')으로 이동
                aria-label="홈으로 가기"
                className="p-2"
            >
                <Home className="h-6 w-6 text-gray-700" />
            </button>
        </div>
    );
}