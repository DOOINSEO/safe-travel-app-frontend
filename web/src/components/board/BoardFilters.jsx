import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = ['최신순', '기상이변', '소매치기', '교통사고', '시설낙후'];

function FilterDropdown({ label }) {
    return (
        <div className="flex-1">
            <button className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
                <span>{label}</span>
                <ChevronDown className="h-4 w-4" />
            </button>
        </div>
    );
}

export default function BoardFilters({ activeCategory, onCategoryClick }) {
    return (
        <div className="p-4 bg-white">
            <div className="mb-4 flex gap-2">
                <FilterDropdown label="국가 선택" />
                <FilterDropdown label="지역 선택" />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryClick(cat)}
                        className={`flex-shrink-0 rounded-full px-3 py-1 text-sm transition-colors ${
                            activeCategory === cat
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}