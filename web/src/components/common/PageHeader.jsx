import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

/**
 * @description 앱 전반의 하위 페이지에서 사용되는 공통 헤더 컴포넌트입니다.
 *              좌측의 뒤로가기 버튼, 중앙의 페이지 제목, 우측의 홈 버튼으로 구성되어
 *              일관된 사용자 탐색 경험을 제공합니다.
 * @param {object} props - 컴포넌트 props
 * @param {string} props.title - 헤더 중앙에 표시될 페이지의 제목
 * @param {string} [props.backPath] - (선택 사항) 뒤로가기 버튼 클릭 시 이동할 특정 경로.
 *                                    이 prop이 없으면 기본적으로 브라우저 히스토리상 이전 페이지(-1)로 이동합니다.
 *
 * @example
 * // 1. 기본 뒤로가기 (이전 페이지로 이동)
 * <PageHeader title="픽토그램 상세" />
 *
 * // 2. 특정 경로로 고정하여 이동 (예: 홈으로 이동)
 * <PageHeader title="픽토그램 목록" backPath="/" />
 */
export default function PageHeader({ title, backPath }) {
    const navigate = useNavigate();

    /**
     * @description 뒤로가기 버튼 클릭 시 실행될 핸들러 함수입니다.
     *              'backPath' prop의 유무에 따라 조건부로 다른 경로로 이동시킵니다.
     */
    const handleBackClick = () => {
        if (backPath) {
            // backPath prop이 제공된 경우, 지정된 경로로 이동합니다.
            navigate(backPath);
        } else {
            // backPath prop이 없는 경우, 기본 동작으로 이전 페이지로 이동합니다.
            navigate(-1);
        }
    };

    return (
        // 가장 바깥쪽 div는 헤더의 전체 높이(60px)와 하단 구분선(border-b)만 담당합니다.
        // 이렇게 하면 내부 여백(padding)과 상관없이 구분선이 화면 양 끝까지 그려집니다.
        <div className="h-[60px] border-b border-gray-200">
            {/*
              내부 div는 실제 컨텐츠(버튼, 제목)의 정렬과 좌우 여백(25px)을 담당합니다.
              h-full: 부모 높이를 꽉 채웁니다.
              items-center: 수직 중앙 정렬
              justify-between: 양쪽 끝으로 요소를 밀어 정렬
              px-[25px]: 좌우 패딩 25px
            */}
            <div className="flex h-full items-center justify-between px-[25px]">

                {/* 왼쪽 영역: 뒤로가기 버튼 */}
                <button
                    onClick={handleBackClick}
                    aria-label="뒤로 가기"
                    className="p-2" // 아이콘 주변의 클릭 영역 확보
                >
                    {/* 아이콘 크기는 32x32px 입니다. */}
                    <ArrowLeft className="h-8 w-8 text-gray-700" />
                </button>

                {/* 중앙 영역: 페이지 제목. absolute 포지셔닝으로 항상 완벽한 중앙을 유지합니다. */}
                <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-bold text-gray-800">
                    {title}
                </h1>

                {/* 오른쪽 영역: 홈 버튼. 클릭 시 항상 메인 페이지('/')로 이동합니다. */}
                <button
                    onClick={() => navigate('/')}
                    aria-label="홈으로 가기"
                    className="p-2" // 아이콘 주변의 클릭 영역 확보
                >
                    {/* 아이콘 크기는 32x32px 입니다. */}
                    <Home className="h-8 w-8 text-gray-700" />
                </button>
            </div>
        </div>
    );
}