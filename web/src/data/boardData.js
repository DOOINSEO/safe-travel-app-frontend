import {CAMBODIA_REGIONS} from './regionData';

// 국가 및 지역 목록 (게시물 작성/수정용)
export const LOCATIONS = [{country: '국가 선택', id: null, regions: [{name: '지역 선택', id: null, nameKo: '지역 선택'}]}, {
    country: '캄보디아',
    id: 'KHM',
    regions: [{name: '지역 전체', id: null, nameKo: '지역 전체'}, ...CAMBODIA_REGIONS.map((region) => ({
        name: region.name, id: region.id, nameKo: region.nameKo,
    })),],
}, {
    country: '터키',
    id: 'TR',
    regions: [{name: 'Istanbul', id: 'TR-01', nameKo: '이스탄불'}, {
        name: 'Ankara',
        id: 'TR-02',
        nameKo: '앙카라'
    }, {name: 'Izmir', id: 'TR-03', nameKo: '이즈미르'}, {name: 'Bursa', id: 'TR-04', nameKo: '부르사'}, {
        name: 'Antalya',
        id: 'TR-05',
        nameKo: '안탈리아'
    }, {name: 'Adana', id: 'TR-06', nameKo: '아다나'}, {name: 'Konya', id: 'TR-07', nameKo: '코니아'}, {
        name: 'Gaziantep',
        id: 'TR-08',
        nameKo: '가지안테프'
    }, {name: 'Sanliurfa', id: 'TR-09', nameKo: '샨르우르파'}, {
        name: 'Kocaeli',
        id: 'TR-10',
        nameKo: '코자엘리'
    }, {name: 'Mersin', id: 'TR-11', nameKo: '메르신'}, {
        name: 'Diyarbakir',
        id: 'TR-12',
        nameKo: '디야르바키르'
    }, {name: 'Hatay', id: 'TR-13', nameKo: '하타이'}, {name: 'Manisa', id: 'TR-14', nameKo: '마니사'}, {
        name: 'Kayseri',
        id: 'TR-15',
        nameKo: '카이세리'
    },],
}, {
    country: '미국',
    id: 'USA',
    regions: [{name: '뉴욕', id: 'USA-NY', nameKo: '뉴욕'}, {name: '로스앤젤레스', id: 'USA-LA', nameKo: '로스앤젤레스'}, {
        name: '시카고',
        id: 'USA-CHI',
        nameKo: '시카고'
    }, {name: '휴스턴', id: 'USA-HOU', nameKo: '휴스턴'}, {name: '피닉스', id: 'USA-PHX', nameKo: '피닉스'}, {
        name: '필라델피아',
        id: 'USA-PHL',
        nameKo: '필라델피아'
    }, {name: '샌안토니오', id: 'USA-SA', nameKo: '샌안토니오'}, {name: '샌디에이고', id: 'USA-SD', nameKo: '샌디에이고'}, {
        name: '댈러스',
        id: 'USA-DAL',
        nameKo: '댈러스'
    }, {name: '산호세', id: 'USA-SJ', nameKo: '산호세'}, {name: '오스틴', id: 'USA-AUS', nameKo: '오스틴'}, {
        name: '잭슨빌',
        id: 'USA-JAX',
        nameKo: '잭슨빌'
    }, {name: '샌프란시스코', id: 'USA-SF', nameKo: '샌프란시스코'}, {name: '콜럼버스', id: 'USA-COL', nameKo: '콜럼버스'}, {
        name: '시애틀',
        id: 'USA-SEA',
        nameKo: '시애틀'
    },],
}, {
    country: '일본',
    id: 'JPN',
    regions: [{name: '도쿄', id: 'JPN-01', nameKo: '도쿄'}, {name: '오사카', id: 'JPN-02', nameKo: '오사카'}, {
        name: '요코하마',
        id: 'JPN-03',
        nameKo: '요코하마'
    }, {name: '나고야', id: 'JPN-04', nameKo: '나고야'}, {name: '삿포로', id: 'JPN-05', nameKo: '삿포로'}, {
        name: '후쿠오카',
        id: 'JPN-06',
        nameKo: '후쿠오카'
    }, {name: '고베', id: 'JPN-07', nameKo: '고베'}, {name: '교토', id: 'JPN-08', nameKo: '교토'}, {
        name: '가와사키',
        id: 'JPN-09',
        nameKo: '가와사키'
    }, {name: '사이타마', id: 'JPN-10', nameKo: '사이타마'}, {name: '히로시마', id: 'JPN-11', nameKo: '히로시마'}, {
        name: '센다이',
        id: 'JPN-12',
        nameKo: '센다이'
    }, {name: '치바', id: 'JPN-13', nameKo: '치바'}, {name: '기타큐슈', id: 'JPN-14', nameKo: '기타큐슈'}, {
        name: '사카이',
        id: 'JPN-15',
        nameKo: '사카이'
    },],
}, {
    country: '베트남',
    id: 'VNM',
    regions: [{name: '하노이', id: 'VNM-01', nameKo: '하노이'}, {name: '호치민', id: 'VNM-02', nameKo: '호치민'}, {
        name: '다낭',
        id: 'VNM-03',
        nameKo: '다낭'
    }, {name: '하이퐁', id: 'VNM-04', nameKo: '하이퐁'}, {name: '껀터', id: 'VNM-05', nameKo: '껀터'}, {
        name: '비엔호아',
        id: 'VNM-06',
        nameKo: '비엔호아'
    }, {name: '나트랑', id: 'VNM-07', nameKo: '나트랑'}, {name: '부온마투옷', id: 'VNM-08', nameKo: '부온마투옷'}, {
        name: '후에',
        id: 'VNM-09',
        nameKo: '후에'
    }, {name: '타이응우옌', id: 'VNM-10', nameKo: '타이응우옌'}, {name: '붕따우', id: 'VNM-11', nameKo: '붕따우'}, {
        name: '퀴논',
        id: 'VNM-12',
        nameKo: '퀴논'
    }, {name: '롱쑤옌', id: 'VNM-13', nameKo: '롱쑤옌'}, {name: '락자', id: 'VNM-14', nameKo: '락자'}, {
        name: '판티엣',
        id: 'VNM-15',
        nameKo: '판티엣'
    },],
}, {
    country: '태국',
    id: 'THA',
    regions: [{name: '방콕', id: 'THA-01', nameKo: '방콕'}, {name: '논타부리', id: 'THA-02', nameKo: '논타부리'}, {
        name: '나콘라차시마',
        id: 'THA-03',
        nameKo: '나콘라차시마'
    }, {name: '치앙마이', id: 'THA-04', nameKo: '치앙마이'}, {name: '핫야이', id: 'THA-05', nameKo: '핫야이'}, {
        name: '우돈타니',
        id: 'THA-06',
        nameKo: '우돈타니'
    }, {name: '팍크렛', id: 'THA-07', nameKo: '팍크렛'}, {name: '콘캔', id: 'THA-08', nameKo: '콘캔'}, {
        name: '푸켓',
        id: 'THA-09',
        nameKo: '푸켓'
    }, {name: '우본랏차타니', id: 'THA-10', nameKo: '우본랏차타니'}, {
        name: '나콘시탐마랏',
        id: 'THA-11',
        nameKo: '나콘시탐마랏'
    }, {name: '나콘사완', id: 'THA-12', nameKo: '나콘사완'}, {name: '나콘빠톰', id: 'THA-13', nameKo: '나콘빠톰'}, {
        name: '핏사눌록',
        id: 'THA-14',
        nameKo: '핏사눌록'
    }, {name: '파타야', id: 'THA-15', nameKo: '파타야'},],
}, {
    country: '프랑스',
    id: 'FRA',
    regions: [{name: '파리', id: 'FRA-01', nameKo: '파리'}, {name: '마르세유', id: 'FRA-02', nameKo: '마르세유'}, {
        name: '리옹',
        id: 'FRA-03',
        nameKo: '리옹'
    }, {name: '툴루즈', id: 'FRA-04', nameKo: '툴루즈'}, {name: '니스', id: 'FRA-05', nameKo: '니스'}, {
        name: '낭트',
        id: 'FRA-06',
        nameKo: '낭트'
    }, {name: '몽펠리에', id: 'FRA-07', nameKo: '몽펠리에'}, {name: '스트라스부르', id: 'FRA-08', nameKo: '스트라스부르'}, {
        name: '보르도',
        id: 'FRA-09',
        nameKo: '보르도'
    }, {name: '릴', id: 'FRA-10', nameKo: '릴'}, {name: '렌', id: 'FRA-11', nameKo: '렌'}, {
        name: '랭스',
        id: 'FRA-12',
        nameKo: '랭스'
    }, {name: '르아브르', id: 'FRA-13', nameKo: '르아브르'}, {name: '생테티엔', id: 'FRA-14', nameKo: '생테티엔'}, {
        name: '툴롱',
        id: 'FRA-15',
        nameKo: '툴롱'
    },],
}, {
    country: '이탈리아',
    id: 'ITA',
    regions: [{name: '로마', id: 'ITA-01', nameKo: '로마'}, {name: '밀라노', id: 'ITA-02', nameKo: '밀라노'}, {
        name: '나폴리',
        id: 'ITA-03',
        nameKo: '나폴리'
    }, {name: '토리노', id: 'ITA-04', nameKo: '토리노'}, {name: '팔레르모', id: 'ITA-05', nameKo: '팔레르모'}, {
        name: '제노바',
        id: 'ITA-06',
        nameKo: '제노바'
    }, {name: '볼로냐', id: 'ITA-07', nameKo: '볼로냐'}, {name: '피렌체', id: 'ITA-08', nameKo: '피렌체'}, {
        name: '바리',
        id: 'ITA-09',
        nameKo: '바리'
    }, {name: '카타니아', id: 'ITA-10', nameKo: '카타니아'}, {name: '베네치아', id: 'ITA-11', nameKo: '베네치아'}, {
        name: '베로나',
        id: 'ITA-12',
        nameKo: '베로나'
    }, {name: '메시나', id: 'ITA-13', nameKo: '메시나'}, {name: '파도바', id: 'ITA-14', nameKo: '파도바'}, {
        name: '트리에스테',
        id: 'ITA-15',
        nameKo: '트리에스테'
    },],
}, {
    country: '스페인',
    id: 'ESP',
    regions: [{name: '마드리드', id: 'ESP-01', nameKo: '마드리드'}, {
        name: '바르셀로나',
        id: 'ESP-02',
        nameKo: '바르셀로나'
    }, {name: '발렌시아', id: 'ESP-03', nameKo: '발렌시아'}, {name: '세비야', id: 'ESP-04', nameKo: '세비야'}, {
        name: '사라고사',
        id: 'ESP-05',
        nameKo: '사라고사'
    }, {name: '말라가', id: 'ESP-06', nameKo: '말라가'}, {name: '무르시아', id: 'ESP-07', nameKo: '무르시아'}, {
        name: '팔마',
        id: 'ESP-08',
        nameKo: '팔마'
    }, {name: '라스팔마스', id: 'ESP-09', nameKo: '라스팔마스'}, {name: '빌바오', id: 'ESP-10', nameKo: '빌바오'}, {
        name: '알리칸테',
        id: 'ESP-11',
        nameKo: '알리칸테'
    }, {name: '코르도바', id: 'ESP-12', nameKo: '코르도바'}, {name: '바야돌리드', id: 'ESP-13', nameKo: '바야돌리드'}, {
        name: '비고',
        id: 'ESP-14',
        nameKo: '비고'
    }, {name: '히혼', id: 'ESP-15', nameKo: '히혼'},],
}, {
    country: '영국',
    id: 'GBR',
    regions: [{name: '런던', id: 'GBR-01', nameKo: '런던'}, {name: '버밍엄', id: 'GBR-02', nameKo: '버밍엄'}, {
        name: '맨체스터',
        id: 'GBR-03',
        nameKo: '맨체스터'
    }, {name: '글래스고', id: 'GBR-04', nameKo: '글래스고'}, {name: '리즈', id: 'GBR-05', nameKo: '리즈'}, {
        name: '리버풀',
        id: 'GBR-06',
        nameKo: '리버풀'
    }, {name: '뉴캐슬', id: 'GBR-07', nameKo: '뉴캐슬'}, {name: '셰필드', id: 'GBR-08', nameKo: '셰필드'}, {
        name: '브리스톨',
        id: 'GBR-09',
        nameKo: '브리스톨'
    }, {name: '벨파스트', id: 'GBR-10', nameKo: '벨파스트'}, {name: '레스터', id: 'GBR-11', nameKo: '레스터'}, {
        name: '에든버러',
        id: 'GBR-12',
        nameKo: '에든버러'
    }, {name: '카디프', id: 'GBR-13', nameKo: '카디프'}, {name: '코번트리', id: 'GBR-14', nameKo: '코번트리'}, {
        name: '노팅엄',
        id: 'GBR-15',
        nameKo: '노팅엄'
    },],
}, {
    country: '독일',
    id: 'DEU',
    regions: [{name: '베를린', id: 'DEU-01', nameKo: '베를린'}, {name: '함부르크', id: 'DEU-02', nameKo: '함부르크'}, {
        name: '뮌헨',
        id: 'DEU-03',
        nameKo: '뮌헨'
    }, {name: '쾰른', id: 'DEU-04', nameKo: '쾰른'}, {name: '프랑크푸르트', id: 'DEU-05', nameKo: '프랑크푸르트'}, {
        name: '슈투트가르트',
        id: 'DEU-06',
        nameKo: '슈투트가르트'
    }, {name: '뒤셀도르프', id: 'DEU-07', nameKo: '뒤셀도르프'}, {name: '도르트문트', id: 'DEU-08', nameKo: '도르트문트'}, {
        name: '에센',
        id: 'DEU-09',
        nameKo: '에센'
    }, {name: '라이프치히', id: 'DEU-10', nameKo: '라이프치히'}, {name: '브레멘', id: 'DEU-11', nameKo: '브레멘'}, {
        name: '드레스덴',
        id: 'DEU-12',
        nameKo: '드레스덴'
    }, {name: '하노버', id: 'DEU-13', nameKo: '하노버'}, {name: '뉘른베르크', id: 'DEU-14', nameKo: '뉘른베르크'}, {
        name: '뒤스부르크',
        id: 'DEU-15',
        nameKo: '뒤스부르크'
    },],
}, {
    country: '호주',
    id: 'AUS',
    regions: [{name: '시드니', id: 'AUS-01', nameKo: '시드니'}, {name: '멜버른', id: 'AUS-02', nameKo: '멜버른'}, {
        name: '브리즈번',
        id: 'AUS-03',
        nameKo: '브리즈번'
    }, {name: '퍼스', id: 'AUS-04', nameKo: '퍼스'}, {name: '애들레이드', id: 'AUS-05', nameKo: '애들레이드'}, {
        name: '골드코스트',
        id: 'AUS-06',
        nameKo: '골드코스트'
    }, {name: '캔버라', id: 'AUS-07', nameKo: '캔버라'}, {name: '뉴캐슬', id: 'AUS-08', nameKo: '뉴캐슬'}, {
        name: '울런공',
        id: 'AUS-09',
        nameKo: '울런공'
    }, {name: '로건', id: 'AUS-10', nameKo: '로건'}, {name: '질롱', id: 'AUS-11', nameKo: '질롱'}, {
        name: '호바트',
        id: 'AUS-12',
        nameKo: '호바트'
    }, {name: '타운즈빌', id: 'AUS-13', nameKo: '타운즈빌'}, {name: '케언즈', id: 'AUS-14', nameKo: '케언즈'}, {
        name: '다윈',
        id: 'AUS-15',
        nameKo: '다윈'
    },],
},];

// 게시판 필터용 지역 목록 (LocationSelector용)
export const FILTER_LOCATIONS = [{
    country: '국가 전체', id: null, regions: [{name: '지역 전체', id: null, nameKo: '지역 전체'}],
}, {
    country: '캄보디아',
    id: 'KHM',
    regions: [{name: '지역 전체', id: null, nameKo: '지역 전체'}, ...CAMBODIA_REGIONS.map((region) => ({
        name: region.name, id: region.id, nameKo: region.nameKo,
    })),],
}, {
    country: '터키',
    id: 'TR',
    regions: [{name: 'Istanbul', id: 'TR-01', nameKo: '이스탄불'}, {
        name: 'Ankara',
        id: 'TR-02',
        nameKo: '앙카라'
    }, {name: 'Izmir', id: 'TR-03', nameKo: '이즈미르'}, {name: 'Bursa', id: 'TR-04', nameKo: '부르사'}, {
        name: 'Antalya',
        id: 'TR-05',
        nameKo: '안탈리아'
    }, {name: 'Adana', id: 'TR-06', nameKo: '아다나'}, {name: 'Konya', id: 'TR-07', nameKo: '코니아'}, {
        name: 'Gaziantep',
        id: 'TR-08',
        nameKo: '가지안테프'
    }, {name: 'Sanliurfa', id: 'TR-09', nameKo: '샨르우르파'}, {
        name: 'Kocaeli',
        id: 'TR-10',
        nameKo: '코자엘리'
    }, {name: 'Mersin', id: 'TR-11', nameKo: '메르신'}, {
        name: 'Diyarbakir',
        id: 'TR-12',
        nameKo: '디야르바키르'
    }, {name: 'Hatay', id: 'TR-13', nameKo: '하타이'}, {name: 'Manisa', id: 'TR-14', nameKo: '마니사'}, {
        name: 'Kayseri',
        id: 'TR-15',
        nameKo: '카이세리'
    },],
}, {
    country: '미국',
    id: 'USA',
    regions: [{name: '뉴욕', id: 'USA-NY', nameKo: '뉴욕'}, {name: '로스앤젤레스', id: 'USA-LA', nameKo: '로스앤젤레스'}, {
        name: '시카고',
        id: 'USA-CHI',
        nameKo: '시카고'
    }, {name: '휴스턴', id: 'USA-HOU', nameKo: '휴스턴'}, {name: '피닉스', id: 'USA-PHX', nameKo: '피닉스'}, {
        name: '필라델피아',
        id: 'USA-PHL',
        nameKo: '필라델피아'
    }, {name: '샌안토니오', id: 'USA-SA', nameKo: '샌안토니오'}, {name: '샌디에이고', id: 'USA-SD', nameKo: '샌디에이고'}, {
        name: '댈러스',
        id: 'USA-DAL',
        nameKo: '댈러스'
    }, {name: '산호세', id: 'USA-SJ', nameKo: '산호세'}, {name: '오스틴', id: 'USA-AUS', nameKo: '오스틴'}, {
        name: '잭슨빌',
        id: 'USA-JAX',
        nameKo: '잭슨빌'
    }, {name: '샌프란시스코', id: 'USA-SF', nameKo: '샌프란시스코'}, {name: '콜럼버스', id: 'USA-COL', nameKo: '콜럼버스'}, {
        name: '시애틀',
        id: 'USA-SEA',
        nameKo: '시애틀'
    },],
}, {
    country: '일본',
    id: 'JPN',
    regions: [{name: '도쿄', id: 'JPN-01', nameKo: '도쿄'}, {name: '오사카', id: 'JPN-02', nameKo: '오사카'}, {
        name: '요코하마',
        id: 'JPN-03',
        nameKo: '요코하마'
    }, {name: '나고야', id: 'JPN-04', nameKo: '나고야'}, {name: '삿포로', id: 'JPN-05', nameKo: '삿포로'}, {
        name: '후쿠오카',
        id: 'JPN-06',
        nameKo: '후쿠오카'
    }, {name: '고베', id: 'JPN-07', nameKo: '고베'}, {name: '교토', id: 'JPN-08', nameKo: '교토'}, {
        name: '가와사키',
        id: 'JPN-09',
        nameKo: '가와사키'
    }, {name: '사이타마', id: 'JPN-10', nameKo: '사이타마'}, {name: '히로시마', id: 'JPN-11', nameKo: '히로시마'}, {
        name: '센다이',
        id: 'JPN-12',
        nameKo: '센다이'
    }, {name: '치바', id: 'JPN-13', nameKo: '치바'}, {name: '기타큐슈', id: 'JPN-14', nameKo: '기타큐슈'}, {
        name: '사카이',
        id: 'JPN-15',
        nameKo: '사카이'
    },],
}, {
    country: '베트남',
    id: 'VNM',
    regions: [{name: '하노이', id: 'VNM-01', nameKo: '하노이'}, {name: '호치민', id: 'VNM-02', nameKo: '호치민'}, {
        name: '다낭',
        id: 'VNM-03',
        nameKo: '다낭'
    }, {name: '하이퐁', id: 'VNM-04', nameKo: '하이퐁'}, {name: '껀터', id: 'VNM-05', nameKo: '껀터'}, {
        name: '비엔호아',
        id: 'VNM-06',
        nameKo: '비엔호아'
    }, {name: '나트랑', id: 'VNM-07', nameKo: '나트랑'}, {name: '부온마투옷', id: 'VNM-08', nameKo: '부온마투옷'}, {
        name: '후에',
        id: 'VNM-09',
        nameKo: '후에'
    }, {name: '타이응우옌', id: 'VNM-10', nameKo: '타이응우옌'}, {name: '붕따우', id: 'VNM-11', nameKo: '붕따우'}, {
        name: '퀴논',
        id: 'VNM-12',
        nameKo: '퀴논'
    }, {name: '롱쑤옌', id: 'VNM-13', nameKo: '롱쑤옌'}, {name: '락자', id: 'VNM-14', nameKo: '락자'}, {
        name: '판티엣',
        id: 'VNM-15',
        nameKo: '판티엣'
    },],
}, {
    country: '태국',
    id: 'THA',
    regions: [{name: '방콕', id: 'THA-01', nameKo: '방콕'}, {name: '논타부리', id: 'THA-02', nameKo: '논타부리'}, {
        name: '나콘라차시마',
        id: 'THA-03',
        nameKo: '나콘라차시마'
    }, {name: '치앙마이', id: 'THA-04', nameKo: '치앙마이'}, {name: '핫야이', id: 'THA-05', nameKo: '핫야이'}, {
        name: '우돈타니',
        id: 'THA-06',
        nameKo: '우돈타니'
    }, {name: '팍크렛', id: 'THA-07', nameKo: '팍크렛'}, {name: '콘캔', id: 'THA-08', nameKo: '콘캔'}, {
        name: '푸켓',
        id: 'THA-09',
        nameKo: '푸켓'
    }, {name: '우본랏차타니', id: 'THA-10', nameKo: '우본랏차타니'}, {
        name: '나콘시탐마랏',
        id: 'THA-11',
        nameKo: '나콘시탐마랏'
    }, {name: '나콘사완', id: 'THA-12', nameKo: '나콘사완'}, {name: '나콘빠톰', id: 'THA-13', nameKo: '나콘빠톰'}, {
        name: '핏사눌록',
        id: 'THA-14',
        nameKo: '핏사눌록'
    }, {name: '파타야', id: 'THA-15', nameKo: '파타야'},],
}, {
    country: '프랑스',
    id: 'FRA',
    regions: [{name: '파리', id: 'FRA-01', nameKo: '파리'}, {name: '마르세유', id: 'FRA-02', nameKo: '마르세유'}, {
        name: '리옹',
        id: 'FRA-03',
        nameKo: '리옹'
    }, {name: '툴루즈', id: 'FRA-04', nameKo: '툴루즈'}, {name: '니스', id: 'FRA-05', nameKo: '니스'}, {
        name: '낭트',
        id: 'FRA-06',
        nameKo: '낭트'
    }, {name: '몽펠리에', id: 'FRA-07', nameKo: '몽펠리에'}, {name: '스트라스부르', id: 'FRA-08', nameKo: '스트라스부르'}, {
        name: '보르도',
        id: 'FRA-09',
        nameKo: '보르도'
    }, {name: '릴', id: 'FRA-10', nameKo: '릴'}, {name: '렌', id: 'FRA-11', nameKo: '렌'}, {
        name: '랭스',
        id: 'FRA-12',
        nameKo: '랭스'
    }, {name: '르아브르', id: 'FRA-13', nameKo: '르아브르'}, {name: '생테티엔', id: 'FRA-14', nameKo: '생테티엔'}, {
        name: '툴롱',
        id: 'FRA-15',
        nameKo: '툴롱'
    },],
}, {
    country: '이탈리아',
    id: 'ITA',
    regions: [{name: '로마', id: 'ITA-01', nameKo: '로마'}, {name: '밀라노', id: 'ITA-02', nameKo: '밀라노'}, {
        name: '나폴리',
        id: 'ITA-03',
        nameKo: '나폴리'
    }, {name: '토리노', id: 'ITA-04', nameKo: '토리노'}, {name: '팔레르모', id: 'ITA-05', nameKo: '팔레르모'}, {
        name: '제노바',
        id: 'ITA-06',
        nameKo: '제노바'
    }, {name: '볼로냐', id: 'ITA-07', nameKo: '볼로냐'}, {name: '피렌체', id: 'ITA-08', nameKo: '피렌체'}, {
        name: '바리',
        id: 'ITA-09',
        nameKo: '바리'
    }, {name: '카타니아', id: 'ITA-10', nameKo: '카타니아'}, {name: '베네치아', id: 'ITA-11', nameKo: '베네치아'}, {
        name: '베로나',
        id: 'ITA-12',
        nameKo: '베로나'
    }, {name: '메시나', id: 'ITA-13', nameKo: '메시나'}, {name: '파도바', id: 'ITA-14', nameKo: '파도바'}, {
        name: '트리에스테',
        id: 'ITA-15',
        nameKo: '트리에스테'
    },],
}, {
    country: '스페인',
    id: 'ESP',
    regions: [{name: '마드리드', id: 'ESP-01', nameKo: '마드리드'}, {
        name: '바르셀로나',
        id: 'ESP-02',
        nameKo: '바르셀로나'
    }, {name: '발렌시아', id: 'ESP-03', nameKo: '발렌시아'}, {name: '세비야', id: 'ESP-04', nameKo: '세비야'}, {
        name: '사라고사',
        id: 'ESP-05',
        nameKo: '사라고사'
    }, {name: '말라가', id: 'ESP-06', nameKo: '말라가'}, {name: '무르시아', id: 'ESP-07', nameKo: '무르시아'}, {
        name: '팔마',
        id: 'ESP-08',
        nameKo: '팔마'
    }, {name: '라스팔마스', id: 'ESP-09', nameKo: '라스팔마스'}, {name: '빌바오', id: 'ESP-10', nameKo: '빌바오'}, {
        name: '알리칸테',
        id: 'ESP-11',
        nameKo: '알리칸테'
    }, {name: '코르도바', id: 'ESP-12', nameKo: '코르도바'}, {name: '바야돌리드', id: 'ESP-13', nameKo: '바야돌리드'}, {
        name: '비고',
        id: 'ESP-14',
        nameKo: '비고'
    }, {name: '히혼', id: 'ESP-15', nameKo: '히혼'},],
}, {
    country: '영국',
    id: 'GBR',
    regions: [{name: '런던', id: 'GBR-01', nameKo: '런던'}, {name: '버밍엄', id: 'GBR-02', nameKo: '버밍엄'}, {
        name: '맨체스터',
        id: 'GBR-03',
        nameKo: '맨체스터'
    }, {name: '글래스고', id: 'GBR-04', nameKo: '글래스고'}, {name: '리즈', id: 'GBR-05', nameKo: '리즈'}, {
        name: '리버풀',
        id: 'GBR-06',
        nameKo: '리버풀'
    }, {name: '뉴캐슬', id: 'GBR-07', nameKo: '뉴캐슬'}, {name: '셰필드', id: 'GBR-08', nameKo: '셰필드'}, {
        name: '브리스톨',
        id: 'GBR-09',
        nameKo: '브리스톨'
    }, {name: '벨파스트', id: 'GBR-10', nameKo: '벨파스트'}, {name: '레스터', id: 'GBR-11', nameKo: '레스터'}, {
        name: '에든버러',
        id: 'GBR-12',
        nameKo: '에든버러'
    }, {name: '카디프', id: 'GBR-13', nameKo: '카디프'}, {name: '코번트리', id: 'GBR-14', nameKo: '코번트리'}, {
        name: '노팅엄',
        id: 'GBR-15',
        nameKo: '노팅엄'
    },],
}, {
    country: '독일',
    id: 'DEU',
    regions: [{name: '베를린', id: 'DEU-01', nameKo: '베를린'}, {name: '함부르크', id: 'DEU-02', nameKo: '함부르크'}, {
        name: '뮌헨',
        id: 'DEU-03',
        nameKo: '뮌헨'
    }, {name: '쾰른', id: 'DEU-04', nameKo: '쾰른'}, {name: '프랑크푸르트', id: 'DEU-05', nameKo: '프랑크푸르트'}, {
        name: '슈투트가르트',
        id: 'DEU-06',
        nameKo: '슈투트가르트'
    }, {name: '뒤셀도르프', id: 'DEU-07', nameKo: '뒤셀도르프'}, {name: '도르트문트', id: 'DEU-08', nameKo: '도르트문트'}, {
        name: '에센',
        id: 'DEU-09',
        nameKo: '에센'
    }, {name: '라이프치히', id: 'DEU-10', nameKo: '라이프치히'}, {name: '브레멘', id: 'DEU-11', nameKo: '브레멘'}, {
        name: '드레스덴',
        id: 'DEU-12',
        nameKo: '드레스덴'
    }, {name: '하노버', id: 'DEU-13', nameKo: '하노버'}, {name: '뉘른베르크', id: 'DEU-14', nameKo: '뉘른베르크'}, {
        name: '뒤스부르크',
        id: 'DEU-15',
        nameKo: '뒤스부르크'
    },],
}, {
    country: '호주',
    id: 'AUS',
    regions: [{name: '시드니', id: 'AUS-01', nameKo: '시드니'}, {name: '멜버른', id: 'AUS-02', nameKo: '멜버른'}, {
        name: '브리즈번',
        id: 'AUS-03',
        nameKo: '브리즈번'
    }, {name: '퍼스', id: 'AUS-04', nameKo: '퍼스'}, {name: '애들레이드', id: 'AUS-05', nameKo: '애들레이드'}, {
        name: '골드코스트',
        id: 'AUS-06',
        nameKo: '골드코스트'
    }, {name: '캔버라', id: 'AUS-07', nameKo: '캔버라'}, {name: '뉴캐슬', id: 'AUS-08', nameKo: '뉴캐슬'}, {
        name: '울런공',
        id: 'AUS-09',
        nameKo: '울런공'
    }, {name: '로건', id: 'AUS-10', nameKo: '로건'}, {name: '질롱', id: 'AUS-11', nameKo: '질롱'}, {
        name: '호바트',
        id: 'AUS-12',
        nameKo: '호바트'
    }, {name: '타운즈빌', id: 'AUS-13', nameKo: '타운즈빌'}, {name: '케언즈', id: 'AUS-14', nameKo: '케언즈'}, {
        name: '다윈',
        id: 'AUS-15',
        nameKo: '다윈'
    },],
},];

// 게시물 수정용 지역 목록 (수정 시에는 '국가 선택' 옵션 없음)
export const EDIT_LOCATIONS = [{
    country: '캄보디아', id: 'KHM', regions: CAMBODIA_REGIONS.map((region) => ({
        name: region.name, id: region.id, nameKo: region.nameKo,
    })),
}, {
    country: '터키', id: 'TR', regions: [{name: '이스탄불', id: 'TR-01', nameKo: '이스탄불'}, {name: '앙카라', id: 'TR-02', nameKo: '앙카라'},],
},];

// 카테고리 목록
export const CATEGORIES = [{id: 1, name: '기상이변'}, {id: 2, name: '교통사고'}, {id: 3, name: '사기'}, {
    id: 4,
    name: '소매치기'
}, {id: 5, name: '시설낙후'}, {id: 6, name: '흉기 난동'}, {id: 7, name: '화재'}, {id: 8, name: '기타'},];

// 카테고리 목록 (선택 옵션 포함, 게시물 작성용)
export const CATEGORIES_WITH_SELECT = [{id: null, name: '카테고리'}, ...CATEGORIES];
