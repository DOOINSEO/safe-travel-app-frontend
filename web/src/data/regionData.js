export const CAMBODIA_REGIONS = [
  // 3단계(출국권고, 특별여행주의보)
  {id: 'KHM-01', name: 'Banteay Meanchey', nameKo: '반띠 메안체이', safetyStage: 3}, // 포이펫시 포함
  {id: 'KHM-02', name: 'Battambang', nameKo: '바탐방', safetyStage: 3},
  {id: 'KHM-10', name: 'Koh Kong', nameKo: '카오콩', safetyStage: 3},
  {id: 'KHM-12', name: 'Phnom Penh', nameKo: '프놈펜', safetyStage: 3},
  {id: 'KHM-14', name: 'Oddar Meanchey', nameKo: '오타르 메안체이', safetyStage: 3},
  {id: 'KHM-15', name: 'Pailin', nameKo: '파일린', safetyStage: 3},
  {id: 'KHM-16', name: 'Preah Sihanouk', nameKo: '시아누크빌', safetyStage: 3},
  {id: 'KHM-17', name: 'Preah Vihear', nameKo: '프레비히어', safetyStage: 3},
  {id: 'KHM-19', name: 'Pursat', nameKo: '푸르사트', safetyStage: 3},
  {id: 'KHM-23', name: 'Svay Rieng', nameKo: '스바이리엥', safetyStage: 3}, // 바벳시 포함

  // 4단계(여행금지)
  {id: 'KHM-07', name: 'Kampot', nameKo: '캄포트', safetyStage: 4}, // 보코산 지역 포함

  // 2단계(여행자제) = 위 3·4단계 제외 전 지역
  {id: 'KHM-03', name: 'Kampong Cham', nameKo: '캄퐁참', safetyStage: 2},
  {id: 'KHM-04', name: 'Kampong Chhnang', nameKo: '캄퐁치낭', safetyStage: 2},
  {id: 'KHM-05', name: 'Kampong Speu', nameKo: '캄퐁스페우', safetyStage: 2},
  {id: 'KHM-06', name: 'Kampong Thom', nameKo: '캄퐁 텀', safetyStage: 2},
  {id: 'KHM-08', name: 'Kandal', nameKo: '칸달', safetyStage: 2},
  {id: 'KHM-09', name: 'Kep', nameKo: '껩', safetyStage: 2},
  {id: 'KHM-11', name: 'Kratie', nameKo: '크라티에', safetyStage: 2},
  {id: 'KHM-13', name: 'Mondulkiri', nameKo: '몬돌끼리', safetyStage: 2},
  {id: 'KHM-18', name: 'Prey Veng', nameKo: '프레이벵', safetyStage: 2},
  {id: 'KHM-20', name: 'Ratanakiri', nameKo: '라타나키리', safetyStage: 2},
  {id: 'KHM-21', name: 'Siem Reap', nameKo: '시엠레아프', safetyStage: 2},
  {id: 'KHM-22', name: 'Stung Treng', nameKo: '스퉁트렝', safetyStage: 2},
  {id: 'KHM-24', name: 'Takeo', nameKo: '타케오', safetyStage: 2},
  {id: 'KHM-25', name: 'Tbong Khmum', nameKo: '트봉크뭄', safetyStage: 2},
];

// 지역 ID로 한국어 이름 찾기
export function getRegionNameKo(regionId) {
  const region = CAMBODIA_REGIONS.find((r) => r.id === regionId);
  return region ? region.nameKo : regionId;
}

// 지역 ID로 전체 정보 찾기
export function getRegionById(regionId) {
  return CAMBODIA_REGIONS.find((r) => r.id === regionId) || null;
}

// 안전단계를 level로 변환 (1단계: level1, 2단계: level2, 3단계: level3, 4단계: level4)
export function getSafetyLevel(safetyStage) {
  if (safetyStage === 1) return 'level1';
  if (safetyStage === 2) return 'level2';
  if (safetyStage === 3) return 'level3';
  if (safetyStage === 4) return 'level4';
  return 'level2'; // 기본값: 2단계
}
