import React from 'react';
import {Search, ArrowLeft} from 'lucide-react';
import {usePlaceAutocomplete} from '../../hooks/usePlaceAutocomplete';

export default function SearchBar({onPlaceSelect, map}) {
  const {
    searchValue,
    predictions,
    showSuggestions,
    isLoading,
    inputRef,
    containerRef,
    handleInputChange,
    handleSelectPlace,
    handleBack,
  } = usePlaceAutocomplete(onPlaceSelect);

  return (
    <div ref={containerRef} className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md">
      <div className="relative">
        <div className="relative flex items-center bg-white rounded-lg shadow-lg border border-gray-200">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleBack}
            className="absolute left-4 p-1 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="홈으로 이동"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          {/* 검색 입력 필드 */}
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={() => {
              if (predictions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder="Search"
            className="w-full h-12 pl-12 pr-12 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          {/* 돋보기 아이콘 */}
          <div className="absolute right-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* 자동완성 드롭다운 목록 */}
        {showSuggestions && (predictions.length > 0 || isLoading) && (
          <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-gray-500">검색 중...</div>
            ) : (
              predictions.map((prediction) => (
                <button
                  key={prediction.place_id}
                  onClick={() => handleSelectPlace(prediction.place_id)}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium">{prediction.structured_formatting.main_text}</div>
                  {prediction.structured_formatting.secondary_text && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {prediction.structured_formatting.secondary_text}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
