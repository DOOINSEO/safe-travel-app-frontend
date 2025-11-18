export const CAMBODIA_REGIONS = [
  // 3단계(여행주의)
  {id: 'KHM-01', name: 'Banteay Meanchey', nameKo: '반띠 메안체이'}, // 포이펫시 포함
  {id: 'KHM-02', name: 'Battambang', nameKo: '바탐방'},
  {id: 'KHM-10', name: 'Koh Kong', nameKo: '카오콩'},
  {id: 'KHM-12', name: 'Phnom Penh', nameKo: '프놈펜'},
  {id: 'KHM-14', name: 'Oddar Meanchey', nameKo: '오타르 메안체이'},
  {id: 'KHM-15', name: 'Pailin', nameKo: '파일린'},
  {id: 'KHM-16', name: 'Preah Sihanouk', nameKo: '시아누크빌'},
  {id: 'KHM-17', name: 'Preah Vihear', nameKo: '프레비히어'},
  {id: 'KHM-19', name: 'Pursat', nameKo: '푸르사트'},
  {id: 'KHM-23', name: 'Svay Rieng', nameKo: '스바이리엥'}, // 바벳시 포함

  // 4단계(여행금지)
  {id: 'KHM-07', name: 'Kampot', nameKo: '캄포트'}, // 보코산 지역 포함

  // 2단계(여행자제) = 위 3·4단계 제외 전 지역
  {id: 'KHM-03', name: 'Kampong Cham', nameKo: '캄퐁참'},
  {id: 'KHM-04', name: 'Kampong Chhnang', nameKo: '캄퐁치낭'},
  {id: 'KHM-05', name: 'Kampong Speu', nameKo: '캄퐁스페우'},
  {id: 'KHM-06', name: 'Kampong Thom', nameKo: '캄퐁 텀'},
  {id: 'KHM-08', name: 'Kandal', nameKo: '칸달'},
  {id: 'KHM-09', name: 'Kep', nameKo: '껩'},
  {id: 'KHM-11', name: 'Kratie', nameKo: '크라티에'},
  {id: 'KHM-13', name: 'Mondulkiri', nameKo: '몬돌끼리'},
  {id: 'KHM-18', name: 'Prey Veng', nameKo: '프레이벵'},
  {id: 'KHM-20', name: 'Ratanakiri', nameKo: '라타나키리'},
  {id: 'KHM-21', name: 'Siem Reap', nameKo: '시엠레아프'},
  {id: 'KHM-22', name: 'Stung Treng', nameKo: '스퉁트렝'},
  {id: 'KHM-24', name: 'Takeo', nameKo: '타케오'},
  {id: 'KHM-25', name: 'Tbong Khmum', nameKo: '트봉크뭄'},
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
