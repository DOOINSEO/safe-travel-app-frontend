import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { pictograms, languages } from '../data/pictogramData';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * @description 픽토그램의 상세 정보를 보여주는 페이지 컴포넌트입니다.
 *              URL 파라미터로 받은 ID를 통해 특정 픽토그램 데이터를 표시하며,
 *              언어 검색 및 선택 기능을 제공하여 선택된 언어의 번역문을 보여줍니다.
 *
 * @example
 * // App.jsx (라우터)에서 동적 경로 파라미터(:id)와 함께 사용됩니다.
 * <Route path="/pictogram/:id" element={<PictogramDetail />} />
 */
export default function PictogramDetail() {
    // --- Component State & Refs ---
    const { id } = useParams(); // URL의 동적 파라미터(예: /pictogram/101 -> '101')를 가져옵니다.
    const [searchTerm, setSearchTerm] = useState(''); // 언어 검색창의 입력값 상태
    const [selectedLanguage, setSelectedLanguage] = useState(null); // 사용자가 최종 선택한 언어 객체 상태
    const [showSuggestions, setShowSuggestions] = useState(false); // 검색어 제안 박스의 노출 여부 상태
    const [isCustomDropdownOpen, setCustomDropdownOpen] = useState(false); // 커스텀 드롭다운 메뉴의 노출 여부 상태
    const searchContainerRef = useRef(null); // 검색창 영역의 DOM 요소를 참조하기 위한 ref
    const customDropdownRef = useRef(null); // 커스텀 드롭다운 영역의 DOM 요소를 참조하기 위한 ref

    // --- Data Processing ---
    // URL 파라미터 'id'와 일치하는 픽토그램 데이터를 pictograms 배열에서 찾습니다.
    const pictogram = pictograms.find((p) => p.id.toString() === id);

    // 검색어('searchTerm')가 변경될 때만 언어 목록을 새로 필터링합니다. (useMemo로 성능 최적화)
    const filteredLanguages = useMemo(() => {
        if (!searchTerm.trim()) return languages; // 검색어가 없으면 전체 목록 반환
        return languages.filter(lang =>
            lang.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    /**
     * 사용자가 언어를 선택했을 때 호출되는 공통 핸들러 함수입니다.
     * 관련된 모든 상태를 업데이트하고 열려있는 UI(제안 박스, 드롭다운)를 닫습니다.
     * @param {object | null} language - 선택된 언어 객체
     */
    const selectLanguage = (language) => {
        setSelectedLanguage(language);
        setSearchTerm(language ? language.name : '');
        setShowSuggestions(false);
        setCustomDropdownOpen(false);
    };

    /**
     * 컴포넌트 외부 영역 클릭을 감지하여, 열려있는 검색 제안 박스나 드롭다운 메뉴를 닫는 효과(effect)입니다.
     * 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고, 언마운트될 때 제거하여 메모리 누수를 방지합니다.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (customDropdownRef.current && !customDropdownRef.current.contains(event.target)) {
                setCustomDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Render Logic ---
    // URL에 해당하는 픽토그램 데이터가 없을 경우, 오류 메시지를 표시하고 렌더링을 중단합니다.
    if (!pictogram) {
        return (
            <div className="min-h-screen bg-white p-5 text-center">
                <PageHeader title="오류" />
                <p className="mt-10">요청하신 픽토그램 정보를 찾을 수 없습니다.</p>
            </div>
        );
    }

    // 렌더링에 사용할 데이터를 구조 분해 할당합니다.
    const { image, korean, english, khmer } = pictogram;

    return (
        <div className="min-h-screen bg-white">
            <div className="px-[20px] py-2">
                <PageHeader title="픽토그램" />
            </div>

            <main className="flex flex-col gap-[25px] px-[20px]">

                {/* 언어 검색 및 선택 UI */}
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
                                setCustomDropdownOpen(false);
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
                                        <div key={lang.code} onClick={() => selectLanguage(lang)} className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{lang.name}</div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-sm text-gray-500">검색 결과가 없습니다.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 오른쪽: 커스텀 언어 선택 드롭다운 */}
                    <div ref={customDropdownRef} className="relative">
                        <button
                            onClick={() => {
                                setCustomDropdownOpen(prev => !prev);
                                setShowSuggestions(false);
                            }}
                            className="flex h-[42px] w-[167px] items-center justify-between rounded-[12px] border border-[#D9D9D9] bg-gray-50 pl-4 pr-3 text-sm focus:border-gray-500 focus:outline-none"
                        >
                            <span className={selectedLanguage ? 'text-gray-800' : 'text-gray-400'}>{selectedLanguage ? selectedLanguage.name : '언어 선택'}</span>
                            {isCustomDropdownOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                        </button>

                        {/* 드롭다운 메뉴 목록 */}
                        {isCustomDropdownOpen && (
                            <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                                {languages.map(lang => (
                                    <div key={lang.code} onClick={() => selectLanguage(lang)} className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{lang.name}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 픽토그램 이미지와 번역 텍스트 */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex h-[320px] w-[320px] items-center justify-center">
                        <img src={image} alt={korean} className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="w-full pt-[13px]">
                        <div className="flex flex-col items-center gap-[5px]">
                            <p className="text-xl font-semibold text-gray-800">{korean}</p>
                            <p className="text-lg font-bold text-gray-900">{english}</p>
                            {selectedLanguage && (
                                <p className="text-lg font-bold text-gray-900">{khmer}</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}