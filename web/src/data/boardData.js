import {CAMBODIA_REGIONS} from './regionData';

// 국가 및 지역 목록 (게시물 작성/수정용)
export const LOCATIONS = [
  {country: '국가 선택', id: null, regions: [{name: '지역 선택', id: null, nameKo: '지역 선택'}]},
  {
    country: '캄보디아',
    id: 'KHM',
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      ...CAMBODIA_REGIONS.map((region) => ({
        name: region.name,
        id: region.id,
        nameKo: region.nameKo,
      })),
    ],
  },
  {
    country: '터키',
    id: 2,
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      {name: '이스탄불', id: 201, nameKo: '이스탄불'},
      {name: '앙카라', id: 202, nameKo: '앙카라'},
    ],
  },
];

// 게시판 필터용 지역 목록 (LocationSelector용)
export const FILTER_LOCATIONS = [
  {
    country: '국가 전체',
    id: null,
    regions: [{name: '지역 전체', id: null, nameKo: '지역 전체'}],
  },
  {
    country: '캄보디아',
    id: 'KHM',
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      ...CAMBODIA_REGIONS.map((region) => ({
        name: region.name,
        id: region.id,
        nameKo: region.nameKo,
      })),
    ],
  },
  {
    country: '터키',
    id: 2,
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      {name: '이스탄불', id: 201, nameKo: '이스탄불'},
      {name: '앙카라', id: 202, nameKo: '앙카라'},
    ],
  },
];

// 게시물 수정용 지역 목록 (수정 시에는 '국가 선택' 옵션 없음)
export const EDIT_LOCATIONS = [
  {
    country: '캄보디아',
    id: 'KHM',
    regions: CAMBODIA_REGIONS.map((region) => ({
      name: region.name,
      id: region.id,
      nameKo: region.nameKo,
    })),
  },
  {
    country: '터키',
    id: 2,
    regions: [
      {name: '이스탄불', id: 201, nameKo: '이스탄불'},
      {name: '앙카라', id: 202, nameKo: '앙카라'},
    ],
  },
];

// 카테고리 목록
export const CATEGORIES = [
  {id: 0, name: '기상이변'},
  {id: 1, name: '교통사고'},
  {id: 2, name: '사기'},
  {id: 3, name: '소매치기'},
  {id: 4, name: '시설낙후'},
  {id: 5, name: '흉기 난동'},
  {id: 6, name: '화재'},
  {id: 7, name: '기타'},
];

// 카테고리 목록 (선택 옵션 포함, 게시물 작성용)
export const CATEGORIES_WITH_SELECT = [{id: null, name: '카테고리'}, ...CATEGORIES];
