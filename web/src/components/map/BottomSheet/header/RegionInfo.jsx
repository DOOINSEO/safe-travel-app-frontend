import React from 'react';
import SafetyBadge from './SafetyBadge';

export default function RegionInfo({selectedPolygon}) {
  return (
    <div className="px-5 py-4">
      {selectedPolygon ? (
        <div>
          <div className="flex item-center gap-4">
            <h2 className="text-2xl font-medium text-black/80">{selectedPolygon.nameKo}</h2>
            <SafetyBadge level={selectedPolygon.level} />
          </div>
          <p className="text-sm text-[#5e5e5e] mㅅ-1">{selectedPolygon.name}</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold">지역 정보</h2>
          <p className="text-gray-600">지도에서 지역을 선택해주세요</p>
        </>
      )}
    </div>
  );
}
