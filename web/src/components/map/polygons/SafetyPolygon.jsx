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
    fillColor: '#FF9800',
    fillOpacity: 0.15,
    strokeWeight: 0,
  },
  danger: {
    fillColor: '#F44336',
    fillOpacity: 0.15,
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
};

export default function SafetyPolygon({data, onClick, isSelected = false}) {
  const level = data.level || 'safe';

  const polygonStyle = isSelected
    ? SELECTED_STYLES[level] || SELECTED_STYLES.safe
    : DEFAULT_STYLES[level] || DEFAULT_STYLES.safe;

  const handleClick = () => {
    onClick?.(data);
  };

  // MultiPolygon 체크
  const isMultiPolygon = Array.isArray(data.coordinates[0]?.[0]);

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
