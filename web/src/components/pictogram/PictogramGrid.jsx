import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 픽토그램 아이템 배열을 반응형 그리드 레이아웃으로 렌더링합니다.
 * @example <PictogramGrid items={pictograms} />
 */

export default function PictogramGrid({ items }) {
    const navigate = useNavigate();

    return (
        <div
            className="grid gap-[15px] pb-10"
            style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            }}
        >
            {items.map(({ id, image, korean }) => (
                <div
                    key={id}
                    onClick={() => navigate(`/pictogram/${id}`)}
                    className="flex aspect-square w-full cursor-pointer items-center justify-center
                               rounded-[16px] bg-[#F3F4F6] p-2 transition-colors hover:bg-[#E5E7EB]"
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