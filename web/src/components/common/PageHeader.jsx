import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

/**
 * 앱 전체 페이지에서 일관된 탐색 UI를 제공하는 공통 헤더입니다.
 * 뒤로가기, 페이지 제목, 홈 버튼으로 구성됩니다.
 *
 * @example
 * <PageHeader title="픽토그램 상세" /> // 이전 페이지로 이동
 * <PageHeader title="내 정보" backPath="/" /> // 홈으로 이동
 */
export default function PageHeader({ title, backPath }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(backPath || -1); // backPath가 있으면 해당 경로로, 없으면 -1(이전 페이지)로 이동
    };

    return (
        <div className="h-[60px] border-b border-gray-200">
            <div className="relative flex h-full items-center justify-between px-[25px]">
                <button onClick={handleBackClick} aria-label="뒤로 가기" className="p-2">
                    <ArrowLeft className="h-8 w-8 text-gray-700" />
                </button>

                {/* absolute 포지셔닝은 좌우 버튼 크기에 상관없이 제목을 완벽한 중앙에 위치시키는 기법입니다. */}
                <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-bold text-gray-800">
                    {title}
                </h1>

                <button onClick={() => navigate('/')} aria-label="홈으로 가기" className="p-2">
                    <Home className="h-8 w-8 text-gray-700" />
                </button>
            </div>
        </div>
    );
}