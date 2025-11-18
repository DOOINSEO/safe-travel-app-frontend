import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {FILTER_LOCATIONS} from '../../data/boardData';

export default function LocationSelector({onCountryChange, onRegionChange}) {
  const [selectedCountryName, setSelectedCountryName] = useState(FILTER_LOCATIONS[0].country);

  // 국가 선택 시 호출되는 함수
  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountryName(countryName);

    const country = FILTER_LOCATIONS.find((c) => c.country === countryName);
    const countryId = country ? country.id : null;

    // 국가 ID를 상위 컴포넌트로 전달
    onCountryChange(countryId);
    // 지역 선택은 '전체'(null)로 초기화
    onRegionChange(null);
  };

  // 지역 선택 시 호출되는 함수
  const handleRegionChange = (e) => {
    const regionId = e.target.value || null;
    // 지역 ID를 상위 컴포넌트로 전달 (문자열, 예: 'KHM-01')
    onRegionChange(regionId);
  };

  // 선택된 국가에 따라 사용 가능한 지역 목록을 필터링
  const availableRegions = FILTER_LOCATIONS.find((c) => c.country === selectedCountryName)?.regions || [];

  return (
    <div className="grid grid-cols-2 gap-4 bg-white px-4 py-3">
      {/* 국가 선택 드롭다운 */}
      <div className="relative">
        <select
          onChange={handleCountryChange}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white p-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FILTER_LOCATIONS.map((loc) => (
            <option key={loc.country} value={loc.country}>
              {loc.country}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>

      {/* 지역 선택 드롭다운 */}
      <div className="relative">
        <select
          onChange={handleRegionChange}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white p-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {availableRegions.map((region) => (
            <option key={region.id || 'all'} value={region.id || ''}>
              {region.nameKo || region.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}
