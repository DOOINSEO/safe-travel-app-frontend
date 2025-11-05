import React from 'react';
import { categories } from '../../data/pictogramData';

/**
 * @description 픽토그램을 필터링하기 위한 카테고리 버튼 UI를 렌더링합니다.
 *              버튼들은 화면 너비에 따라 자동으로 줄바꿈되며, 텍스트 길이에 따라 버튼 높이가 유연하게 조절됩니다.
 *              선택된 버튼은 활성화 스타일이 적용되고, 클릭 시 부모 컴포넌트의 상태를 업데이트합니다.
 * @param {object} props - 컴포넌트 props
 * @param {string | null} props.selectedCategory - 현재 활성화된 카테고리의 ID
 * @param {(categoryId: string) => void} props.onSelectCategory - 카테고리 버튼 클릭 시 호출될 콜백 함수
 *
 * @example
 * const [currentCategory, setCurrentCategory] = useState(null);
 * <CategoryFilter
 *   selectedCategory={currentCategory}
 *   onSelectCategory={(id) => setCurrentCategory(id)}
 * />
 */
export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
    return (
        <div className="text-center pb-[13px]">
            <div className="py-4">
                <h2 className="text-base font-bold text-gray-800">상황별 카테고리</h2>
            </div>

            <div className="flex flex-wrap justify-start gap-x-[10px] gap-y-[13px]">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`
                            flex items-center justify-center rounded-[12px] border
                            min-h-[30px] px-3 py-[4px]
                            text-[13px] font-normal tracking-[-0.5px] transition-colors
                            flex-grow flex-shrink-0
                            ${
                            selectedCategory === cat.id
                                ? 'border-gray-800 bg-gray-800 text-white'
                                // 활성화 상태
                                : 'border-[#E5E7EB] bg-white text-gray-600 hover:bg-gray-50'
                            // 비활성화 상태
                        }
                        `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}