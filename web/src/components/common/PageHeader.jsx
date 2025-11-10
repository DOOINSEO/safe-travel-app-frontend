import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

/**
 * 앱 전체 페이지에서 일관된 탐색 UI를 제공하는 공통 헤더입니다.
 * 뒤로가기, 페이지 제목, 홈 버튼으로 구성됩니다.
 * @param {object} props
 * @param {string} props.title - 헤더 중앙에 표시될 페이지 제목
 * @param {string} [props.backPath] - 뒤로가기 버튼 클릭 시 이동할 특정 경로. 지정하지 않으면 이전 페이지로 이동합니다.
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
        // 외부 div는 높이와 하단 구분선을, 내부 div는 컨텐츠 정렬과 여백을 담당합니다.
        // 이 구조 덕분에 구분선이 화면 양 끝까지 깔끔하게 그려집니다.
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