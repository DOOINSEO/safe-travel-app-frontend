import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 픽토그램 아이템 배열을 반응형 그리드 레이아웃으로 렌더링합니다.
 * @param {object} props
 * @param {Array<{id: number|string, image: string, korean: string}>} props.items - 표시할 픽토그램 객체 배열
 *
 * @example <PictogramGrid items={pictograms} />
 */
export default function PictogramGrid({ items }) {
    const navigate = useNavigate();

    return (
        <div
            className="grid gap-[15px] pb-10"
            style={{
                // CSS Grid의 이 속성은 브라우저가 가능한 한 많은 아이템(최소 70px)을
                // 한 줄에 자동으로 채우도록 만들어주는 반응형 레이아웃 기법입니다.
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            }}
        >
            {items.map(({ id, image, korean }) => (
                <div
                    key={id}
                    onClick={() => navigate(`/pictogram/${id}`)}
                    className="flex aspect-square w-full cursor-pointer items-center justify-center
                               rounded-[16px] bg-[#F3F4F6] p-2 transition-colors hover:bg-[#E5E7EB]"
                    // 아래 속성들은 div를 키보드와 스크린 리더에서 버튼처럼 동작하도록 만들어 웹 접근성을 보장합니다.
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/pictogram/${id}`)}
                    aria-label={korean}
                >
                    <img src={image} alt={korean} className="max-h-full max-w-full object-contain" />
                </div>
            ))}
        </div>
    );
}