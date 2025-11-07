// GeoJSON을 폴리곤 배열로 변환

import {getKoreanRegionName} from '../../data/map/regionNameMapping';

export function convertGADMToPolygons(geojson) {
  if (!geojson || !geojson.features) {
    console.error('Invalid GeoJSON data');
    return [];
  }

  // 지역 순회 -> 지역정보, 좌표 데이터 추출
  return geojson.features.map((feature, index) => {
    const properties = feature.properties;
    const geometry = feature.geometry;

    // 좌표 변환: [lng, lat] → {lat, lng}
    let coordinates = [];

    if (geometry.type === 'Polygon') {
      // Polygon: 첫 번째 외곽선만 사용
      coordinates = geometry.coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
      }));
    } else if (geometry.type === 'MultiPolygon') {
      // MultiPolygon: 모든 폴리곤 포함 (본토 + 섬들)
      coordinates = geometry.coordinates.map((polygon) => {
        return polygon[0].map(([lng, lat]) => ({
          lat,
          lng,
        }));
      });
    }

    const originalName = properties.NAME_1 || `Region ${index}`;
    const koreanName = getKoreanRegionName(originalName);

    return {
      id: properties.GID_1 || `region-${index}`,
      name: originalName, // 원본 이름
      nameKo: koreanName, // 한국어 이름
      level: 'safe', // 안전단계(기본값)
      coordinates, // 좌표
      // 원본 데이터도
      originalProperties: {
        country: properties.COUNTRY,
        type: properties.ENGTYPE_1,
        iso: properties.ISO_1,
      },
    };
  });
}

// 좌표 간소화
export function simplifyCoordinates(coordinates, tolerance = 0.001) {
  if (coordinates.length < 3) return coordinates;

  // 일정 간격으로 점 샘플링
  const step = Math.max(1, Math.floor(coordinates.length / 100));
  const simplified = coordinates.filter((_, index) => index % step === 0);

  // 마지막 점은 항상 포함 (폴리곤 닫기)
  if (simplified[simplified.length - 1] !== coordinates[coordinates.length - 1]) {
    simplified.push(coordinates[coordinates.length - 1]);
  }

  return simplified;
}
