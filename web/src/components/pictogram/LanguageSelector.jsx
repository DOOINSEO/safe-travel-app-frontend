import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { languages } from '../../data/pictogramData';

/**
 * 언어 검색 및 선택 드롭다운 UI를 제공하는 컴포넌트입니다.
 */
export default function LanguageSelector({ selectedLanguage, onSelectLanguage }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const searchContainerRef = useRef(null);
    const dropdownRef = useRef(null);

    // 검색어 입력 시 불필요한 리렌더링을 방지합니다.
    const filteredLanguages = useMemo(() => {
        if (!searchTerm.trim()) return []; // 검색어가 없으면 제안 목록을 비웁니다.
        return languages.filter(lang =>
            lang.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    /** 언어를 최종 선택하고, 부모 컴포넌트에 알린 후 내부 UI 상태를 초기화합니다. */
    const handleSelect = (language) => {
        onSelectLanguage(language); // 부모 컴포넌트의 상태를 업데이트합니다.
        setSearchTerm(language ? language.name : ''); // 검색창 텍스트를 선택된 언어로 설정합니다.
        setShowSuggestions(false);
        setDropdownOpen(false);
    };

    // 컴포넌트 외부를 클릭하면 열려있는 제안/드롭다운 메뉴를 닫습니다.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-2 py-[10px]">
            {/* 왼쪽: 언어 검색 입력창 */}
            <div ref={searchContainerRef} className="relative flex-grow">
                <input
                    type="text"
                    placeholder="언어 검색"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                        setDropdownOpen(false); // 검색창 사용 시 드롭다운은 닫습니다.
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="h-[42px] w-full rounded-[12px] border border-[#D9D9D9] bg-gray-50 pl-4 pr-10 text-sm focus:border-gray-500 focus:outline-none"
                    autoComplete="off"
                />
                <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                {/* 검색어에 따른 추천 목록 */}
                {showSuggestions && searchTerm.trim() && (
                    <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map(lang => (
                                <div key={lang.code} onClick={() => handleSelect(lang)} className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{lang.name}</div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">검색 결과가 없습니다.</div>
                        )}
                    </div>
                )}
            </div>

            {/* 오른쪽: 커스텀 언어 선택 드롭다운 */}
            <div ref={dropdownRef} className="relative">
                <button
                    onClick={() => {
                        setDropdownOpen(prev => !prev);
                        setShowSuggestions(false); // 드롭다운 사용 시 검색 제안은 닫습니다.
                    }}
                    className="flex h-[42px] w-[167px] items-center justify-between rounded-[12px] border border-[#D9D9D9] bg-gray-50 pl-4 pr-3 text-sm focus:border-gray-500 focus:outline-none"
                >
                    <span className={selectedLanguage ? 'text-gray-800' : 'text-gray-400'}>
                        {selectedLanguage ? selectedLanguage.name : '언어 선택'}
                    </span>
                    {isDropdownOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>

                {/* 드롭다운 메뉴 목록 */}
                {isDropdownOpen && (
                    <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                        {languages.map(lang => (
                            <div key={lang.code} onClick={() => handleSelect(lang)} className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{lang.name}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}