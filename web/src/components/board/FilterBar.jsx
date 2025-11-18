import React, {useEffect, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';

const CATEGORIES = [{id: 1, name: '기상이변'}, {id: 2, name: '소매치기'}, {id: 3, name: '교통사고'}, {id: 4, name: '시설낙후'},];

const SORT_OPTIONS = [{value: 'createdAt', label: '최신순'}, {
    value: 'likeCount',
    label: '추천 높은순'
}, {value: 'likeCount,asc', label: '추천 낮은순'},];

export default function FilterBar({currentSort, onSortChange, onCategoryToggle, activeCategoryId}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);
    const handleSortSelect = (value) => {
        onSortChange(value);
        setIsDropdownOpen(false);
    };
    const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === currentSort)?.label || '최신순';

    return (<div className="relative z-20 flex items-center space-x-2 bg-white px-4 py-2">
            {/* Sort Dropdown Button */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-1 whitespace-nowrap rounded-full bg-[#D9D9D9] px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-300">
                    {currentSortLabel}
                    <ChevronDown size={14}/>
                </button>
                {isDropdownOpen && (<div
                    className="absolute left-0 top-full z-10 mt-2 w-40 rounded-md border bg-white shadow-lg"> {SORT_OPTIONS.map(option => (
                    <button key={option.value} onClick={() => handleSortSelect(option.value)}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"> {option.label} </button>))} </div>)}
            </div>

            {/* Category Buttons */}
            <div className="flex-1 overflow-x-auto whitespace-nowrap">
                <div className="inline-flex space-x-2">
                    {CATEGORIES.map(category => {
                        // --- 수정된 부분: includes 대신 단순 비교로 변경 ---
                        const isActive = activeCategoryId === category.id;

                        return (<button
                                key={category.id}
                                onClick={() => onCategoryToggle(category.id)}
                                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                                    ${isActive ? 'bg-[#E8F5FF] text-[#026ABF]' : 'bg-[#D9D9D9]/40 text-gray-700 hover:bg-[#D9D9D9]/60'}`}
                            >
                                {category.name}
                            </button>);
                    })}
                </div>
            </div>
        </div>);
}