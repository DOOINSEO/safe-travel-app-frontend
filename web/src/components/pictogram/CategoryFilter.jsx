import React from 'react';

export default function CategoryFilter({ items = [], selectedId, onSelect }) {
    const allCategory = { id: null, name: '전체' };
    const displayItems = [allCategory, ...items];

    return (
        <div className="text-center pb-[13px]">
            <div className="py-4">
                <h2 className="text-base font-bold text-gray-800">상황별 카테고리</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-[13px]">
                {displayItems.map((item) => (
                    <button
                        key={item.id ?? 'all'}
                        onClick={() => onSelect(item.id)}
                        className={`
                            flex items-center justify-center rounded-[12px] border
                            min-h-[30px] px-3 py-[4px]
                            text-[13px] font-normal tracking-[-0.5px] transition-colors
                            flex-shrink-0
                            ${
                            selectedId === item.id
                                ? 'border-gray-800 bg-gray-800 text-white'
                                : 'border-[#E5E7EB] bg-white text-gray-600 hover:bg-gray-50'
                        }
                        `}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}