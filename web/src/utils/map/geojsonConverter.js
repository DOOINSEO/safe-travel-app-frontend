// GeoJSON을 폴리곤 배열로 변환

import {CAMBODIA_REGIONS} from '../../data/regionData';

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

    // GID_1 (예: 'KHM-01')을 사용하여 CAMBODIA_REGIONS에서 지역 정보 찾기
    const regionId = properties.GID_1 || `region-${index}`;
    const regionData = CAMBODIA_REGIONS.find((r) => r.id === regionId);

    return {
      id: regionId,
      name: regionData?.name || properties.NAME_1 || `Region ${index}`, // 영문 이름
      nameKo: regionData?.nameKo || properties.NAME_1 || `Region ${index}`, // 한국어 이름
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

// 국가 단위 GeoJSON을 폴리곤 배열로 변환
export function convertWorldToPolygons(geojson) {
  if (!geojson || !geojson.features) {
    console.error('Invalid GeoJSON data');
    return [];
  }

  // 국가 순회 -> 국가 정보, 좌표 데이터 추출
  return geojson.features.map((feature, index) => {
    const properties = feature.properties;
    const geometry = feature.geometry;

    // 좌표 변환: [lng, lat] → {lat, lng}
    let coordinates = [];
    let isMultiPolygon = false;

    if (geometry.type === 'Polygon') {
      // Polygon: 첫 번째 외곽선만 사용
      // coordinates 구조: [[[lng, lat], ...]]
      const rawCoords = geometry.coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
      }));
      // 좌표가 적으면 보간하여 부드럽게 만들기 (custom.geo.json은 좌표가 많으므로 보간 불필요)
      coordinates = rawCoords.length < 30 ? interpolateCoordinates(rawCoords, 100) : rawCoords;
    } else if (geometry.type === 'MultiPolygon') {
      // MultiPolygon: 모든 폴리곤 포함 (본토 + 섬들)
      // coordinates 구조: [[[[lng, lat], ...]], [[[lng, lat], ...]]]
      isMultiPolygon = true;
      coordinates = geometry.coordinates.map((polygonGroup) => {
        // polygonGroup[0]은 첫 번째 폴리곤의 외곽선
        const rawCoords = polygonGroup[0].map(([lng, lat]) => ({
          lat,
          lng,
        }));
        // 좌표가 적으면 보간하여 부드럽게 만들기 (custom.geo.json은 좌표가 많으므로 보간 불필요)
        return rawCoords.length < 30 ? interpolateCoordinates(rawCoords, 100) : rawCoords;
      });
    }

    const countryName = properties.name || properties.admin || properties.name_long || `Country ${index}`;

    return {
      id: properties.adm0_a3 || properties.sov_a3 || `country-${index}`,
      name: countryName, // 국가 이름
      nameKo: countryName, // 한국어 이름 (추후 매핑 가능)
      level: 'level1', // 기본값: 1단계
      coordinates, // 좌표
      isMultiPolygon, // MultiPolygon 여부 플래그
      // 원본 데이터
      originalProperties: {
        sovereignt: properties.sovereignt,
        iso: properties.adm0_a3 || properties.sov_a3,
        type: properties.type,
      },
    };
  });
}

// 좌표 보간 (부드러운 곡선을 위한 좌표 추가)
export function interpolateCoordinates(coordinates, maxPoints = 200) {
  if (coordinates.length >= maxPoints) return coordinates;
  if (coordinates.length < 3) return coordinates;

  const interpolated = [];
  const step = coordinates.length / maxPoints;

  for (let i = 0; i < maxPoints; i++) {
    const index = i * step;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const fraction = index - lower;

    if (upper >= coordinates.length) {
      interpolated.push(coordinates[coordinates.length - 1]);
      break;
    }

    if (lower === upper) {
      interpolated.push(coordinates[lower]);
    } else {
      // 선형 보간
      const lat = coordinates[lower].lat + (coordinates[upper].lat - coordinates[lower].lat) * fraction;
      const lng = coordinates[lower].lng + (coordinates[upper].lng - coordinates[lower].lng) * fraction;
      interpolated.push({lat, lng});
    }
  }

  // 마지막 점은 항상 원본의 마지막 점으로 설정 (폴리곤 닫기)
  if (interpolated.length > 0) {
    interpolated[interpolated.length - 1] = coordinates[coordinates.length - 1];
  }

  return interpolated;
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
