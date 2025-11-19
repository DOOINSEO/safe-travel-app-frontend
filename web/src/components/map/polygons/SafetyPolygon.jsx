import React from 'react';
import {Polygon} from '@react-google-maps/api';

const DEFAULT_STYLES = {
  safe: {
    fillColor: '#4CAF50',
    fillOpacity: 0.15,
    strokeWeight: 0,
  },
  caution: {
    fillColor: '#FFC107',
    fillOpacity: 0.15,
    strokeWeight: 0,
  },
  warning: {
    fillColor: '#F44336',
    fillOpacity: 0.15,
    strokeWeight: 0,
  },
  danger: {
    fillColor: '#282828ff',
    fillOpacity: 0.15,
    strokeWeight: 0,
  },
  // 안전단계별 색상 시스템
  level1: {
    fillColor: '#4CAF50', // 초록색 (1단계)
    fillOpacity: 0.2,
    strokeWeight: 0,
  },
  level2: {
    fillColor: '#FFC107', // 노란색 (2단계: 여행자제)
    fillOpacity: 0.2,
    strokeWeight: 0,
  },
  level3: {
    fillColor: '#F44336', // 빨간색 (3단계: 출국권고, 특별여행주의보)
    fillOpacity: 0.2,
    strokeWeight: 0,
  },
  level4: {
    fillColor: '#282828', // 검은색 (4단계: 여행금지)
    fillOpacity: 0.2,
    strokeWeight: 0,
  },
};

// 선택된 스타일
const SELECTED_STYLES = {
  safe: {
    fillColor: '#4CAF50',
    fillOpacity: 0.5,
    strokeColor: '#2E7D32',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  caution: {
    fillColor: '#FFC107',
    fillOpacity: 0.5,
    strokeColor: '#F57F17',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  warning: {
    fillColor: '#FF9800',
    fillOpacity: 0.5,
    strokeColor: '#E65100',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  danger: {
    fillColor: '#F44336',
    fillOpacity: 0.5,
    strokeColor: '#B71C1C',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  // 안전단계별 색상 시스템 (선택 시)
  level1: {
    fillColor: '#4CAF50',
    fillOpacity: 0.5,
    strokeColor: '#2E7D32',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  level2: {
    fillColor: '#FFC107',
    fillOpacity: 0.5,
    strokeColor: '#F57F17',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  level3: {
    fillColor: '#F44336',
    fillOpacity: 0.5,
    strokeColor: '#B71C1C',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
  level4: {
    fillColor: '#282828',
    fillOpacity: 0.5,
    strokeColor: '#000000',
    strokeWeight: 3,
    strokeOpacity: 1,
  },
};

export default function SafetyPolygon({data, onClick, isSelected = false}) {
  const level = data.level || 'level2';

  const polygonStyle = isSelected
    ? SELECTED_STYLES[level] || SELECTED_STYLES.level2
    : DEFAULT_STYLES[level] || DEFAULT_STYLES.level2;

  const handleClick = () => {
    onClick?.(data);
  };

  // MultiPolygon 체크
  // data.isMultiPolygon 플래그가 있으면 사용, 없으면 배열 구조로 판단
  // coordinates[0]이 배열이고, 그 첫 번째 요소가 객체이면서 'lat' 속성이 없으면 MultiPolygon
  const isMultiPolygon =
    data.isMultiPolygon !== undefined
      ? data.isMultiPolygon
      : Array.isArray(data.coordinates[0]) &&
        data.coordinates[0].length > 0 &&
        typeof data.coordinates[0][0] === 'object' &&
        !('lat' in data.coordinates[0][0]);

  // MultiPolygon인 경우 여러 Polygon 렌더링 (+ 섬)
  if (isMultiPolygon) {
    return (
      <>
        {data.coordinates.map((polygonCoords, index) => (
          <Polygon key={`${data.id}-${index}`} paths={polygonCoords} options={polygonStyle} onClick={handleClick} />
        ))}
      </>
    );
  }

  // 단일 Polygon 렌더링
  return <Polygon paths={data.coordinates} options={polygonStyle} onClick={handleClick} />;
}
