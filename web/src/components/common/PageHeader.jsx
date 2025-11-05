import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * @description 앱 전반에서 사용되는 공통 페이지 헤더입니다.
 *              좌측에는 뒤로가기 버튼이 있으며, 그 옆에는 페이지의 제목을 표시합니다.
 * @param {{ title: string }} props - 컴포넌트 props
 * @param {string} props.title - 헤더에 표시될 페이지 제목
 *
 * @example
 * // 픽토그램 페이지 상단에 헤더를 추가하는 예시
 * <PageHeader title="픽토그램" />
 */
export default function PageHeader({ title }) {
    const navigate = useNavigate();

    return (
        <div className="flex h-[38px] items-center gap-[15px] border-b border-gray-200">
            <button
                onClick={() => navigate(-1)}
                aria-label="뒤로 가기"
            >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-base font-bold leading-[22px] text-gray-800">
                {title}
            </h1>
        </div>
    );
}