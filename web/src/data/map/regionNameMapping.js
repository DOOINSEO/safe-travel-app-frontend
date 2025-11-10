// 캄보디아 지역명 한국어 매핑

export const CAMBODIA_REGION_NAMES_KO = {
  BântéayMéanchey: '반띠어이민쩌이',
  Batdâmbâng: '바탐방',
  KâmpóngCham: '캄퐁참',
  KâmpóngChhnang: '캄퐁츠낭',
  KâmpóngSpœ: '캄퐁스프',
  KâmpóngThum: '캄퐁톰',
  Kâmpôt: '캄폿',
  Kândal: '칸달',
  KaôhKong: '꼬콩',
  Kep: '껩',
  Krâchéh: '끄라쩨',
  KrongPailin: '파일린',
  KrongPreahSihanouk: '시아누크빌',
  MôndólKiri: '몬돌끼리',
  OtdarMeanChey: '오다르민쩨이',
  PhnomPenh: '프놈펜',
  Pouthisat: '포티삿',
  PreahVihéar: '프레아비히어',
  PreyVêng: '쁘레이벵',
  Rôtânôkiri: '라따나끼리',
  Siemréab: '씨엠립',
  StœngTrêng: '스퉁트렝',
  SvayRieng: '스바이리엥',
  Takêv: '따께오',
  TbongKhmum: '뜨봉크뭄',
};

// 지역명을 한국어로 변환
export function getKoreanRegionName(originalName) {
  return CAMBODIA_REGION_NAMES_KO[originalName] || originalName;
}
