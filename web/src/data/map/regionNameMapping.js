// 캄보디아 지역명 한국어 매핑

export const CAMBODIA_REGION_NAMES_KO = {
  BântéayMéanchey: '반띠 메안체이',
  Batdâmbâng: '바탐방',
  KâmpóngCham: '캄퐁참',
  KâmpóngChhnang: '캄퐁치낭',
  KâmpóngSpœ: '캄퐁스페우',
  KâmpóngThum: '캄퐁 텀',
  Kâmpôt: '캄포트',
  Kândal: '칸달',
  KaôhKong: '카오콩',
  Kep: '껩',
  Krâchéh: '크라티에',
  KrongPailin: '파일린',
  KrongPreahSihanouk: '시아누크빌',
  MôndólKiri: '몬돌끼리',
  OtdarMeanChey: '오타르 메안체이',
  PhnomPenh: '프놈펜',
  Pouthisat: '푸르사트',
  PreahVihéar: '프레비히어',
  PreyVêng: '프레이벵',
  Rôtânôkiri: '라타나키리',
  Siemréab: '시엠레아프',
  StœngTrêng: '스퉁트렝',
  SvayRieng: '스바이리엥',
  Takêv: '타케오',
  TbongKhmum: '트봉크뭄',
};

// 지역명을 한국어로 변환
export function getKoreanRegionName(originalName) {
  return CAMBODIA_REGION_NAMES_KO[originalName] || originalName;
}
