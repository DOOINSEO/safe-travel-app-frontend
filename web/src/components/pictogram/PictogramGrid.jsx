import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @description 픽토그램 아이템들을 반응형 그리드 형태로 렌더링합니다.
 *              화면 너비에 따라 한 줄에 표시되는 아이템의 개수가 자동으로 조절되어,
 *              아이템의 크기가 과도하게 커지는 것을 방지합니다.
 * @param {object} props - 컴포넌트 props
 * @param {Array<object>} props.items - 화면에 표시할 픽토그램 객체들의 배열.
 *                                      각 객체는 'id', 'image', 'korean' 키를 포함해야 합니다.
 *
 * @example
 * // pictogramData에서 가져온 items 배열을 props로 전달하는 예시
 * <PictogramGrid items={filteredPictograms} />
 */
export default function PictogramGrid({ items }) {
    const navigate = useNavigate();

    return (
        <div
            className="grid gap-[15px] pb-10"
            style={{
                // 각 아이템의 최소 너비를 70px로 유지하면서, 가능한 많은 아이템을 한 줄에 채우는 동적 그리드 레이아웃입니다.
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