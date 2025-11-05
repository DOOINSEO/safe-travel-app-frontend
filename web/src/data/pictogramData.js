/**
 * @file 픽토그램 기능과 관련된 모든 정적 데이터를 관리하는 파일입니다.
 *       언어, 카테고리, 그리고 각 픽토그램 아이템의 상세 정보를 포함합니다.
 */

import * as icons from '../assets/pictogram';

/**
 * @description 번역 언어 선택 UI에서 사용될 언어 목록입니다.
 * @type {Array<{code: string, name: string}>}
 * @property {string} code - 언어의 고유 코드 (예: 'km' for 크메르어)
 * @property {string} name - UI에 표시될 언어의 이름
 */
export const languages = [
    { code: 'km', name: '크메르어' },
];

/**
 * @description '상황별 카테고리' 필터링 UI에 사용될 카테고리 목록입니다.
 * @type {Array<{id: string, name: string}>}
 * @property {string} id - 카테고리의 고유 식별자 (필터링 로직에 사용)
 * @property {string} name - UI에 표시될 카테고리의 이름
 */
export const categories = [
    { id: 'emergency', name: '응급/안전' },
    { id: 'tourism', name: '관광/여가' },
    { id: 'food', name: '식당/음료' },
    { id: 'facilities', name: '기본 편의 시설' },
    { id: 'accommodation', name: '숙소' },
    { id: 'transport', name: '교통' },
    { id: 'shopping', name: '쇼핑' },
];

/**
 * @description 앱에서 사용되는 모든 픽토그램 아이템의 상세 정보를 담고 있는 배열입니다.
 * @type {Array<object>}
 * @property {number} id - 각 아이템의 고유 식별자
 * @property {string} category - 아이템이 속한 카테고리의 ID (`categories` 배열의 `id`와 일치)
 * @property {string} korean - 한국어 텍스트
 * @property {string} english - 영어 번역 문장
 * @property {string} khmer - 크메르어 번역 문장
 * @property {any} image - `assets` 폴더에서 불러온 이미지 리소스
 */
export const pictograms = [
    // 1. 기본 편의 시설
    { id: 101, category: 'facilities', korean: '화장실', english: 'Where is the restroom?', image: icons.restroom, khmer: 'តើបន្ទប់ទឹកនៅឯណា?' },
    { id: 102, category: 'facilities', korean: '와이파이', english: 'What is the Wi-Fi password?', image: icons.wifi, khmer: 'តើលេខសម្ងាត់ Wi-Fi ជាអ្វី?' },
    { id: 103, category: 'facilities', korean: '휴대폰 충전', english: 'Where can I charge my phone?', image: icons.charging, khmer: 'តើខ្ញុំអាចសាកទូរស័ព្ទនៅឯណា?' },
    { id: 104, category: 'facilities', korean: '콘센트', english: 'Is there a power outlet I can use?', image: icons.powerOutlet, khmer: 'តើមានព្រីភ្លើងដែលខ្ញុំអាចប្រើបានទេ?' },
    { id: 105, category: 'facilities', korean: '캐비닛', english: 'Are there any lockers available?', image: icons.locker, khmer: 'តើមានទូដាក់អីវ៉ាន់(ឡុកឃ័រ)ទេ?' },
    { id: 106, category: 'facilities', korean: '엘리베이터', english: 'Where is the elevator?', image: icons.elevator, khmer: 'តើជណ្តើរយន្តនៅឯណា?' },
    { id: 107, category: 'facilities', korean: '에스컬레이터', english: 'Where is the escalator?', image: icons.escalator, khmer: 'តើជណ្តើរយន្តប្រអប់នៅឯណា?' },
    { id: 108, category: 'facilities', korean: '음수대', english: 'Where can I get some drinking water?', image: icons.drinkingFountain, khmer: 'តើខ្ញុំអាចរកទឹកផឹកនៅឯណា?' },
    { id: 109, category: 'facilities', korean: '수유실', english: 'Is there a nursing room?', image: icons.nursery, khmer: 'តើមានបន្ទប់បំបៅដោះកូនទេ?' },
    { id: 110, category: 'facilities', korean: '휠체어', english: 'Is this place wheelchair accessible?', image: icons.accessibility, khmer: 'តើកន្លែងនេះអាចចូលប្រើដោយរទេះរុញបានទេ?' },
    { id: 111, category: 'facilities', korean: '휠체어 리프트', english: 'Is there a wheelchair lift?', image: icons.wheelchairRamp, khmer: 'តើមានជណ្តើរយន្តសម្រាប់រទេះរុញទេ?' },
    { id: 112, category: 'facilities', korean: '장애인 화장실', english: 'Where is the accessible restroom?', image: icons.accessibleRestroom, khmer: 'តើបន្ទប់ទឹកសម្រាប់ជនពិការនៅឯណា?' },

    // 2. 식당/음료
    { id: 201, category: 'food', korean: '식당', english: 'I\'m looking for a restaurant.', image: icons.restaurant, khmer: 'ខ្ញុំកំពុងរកមើលភោជនីយដ្ឋាន។' },
    { id: 202, category: 'food', korean: '커피, 차', english: 'Where can I get coffee or tea?', image: icons.cafe, khmer: 'តើខ្ញុំអាចរកកាហ្វេ ឬតែនៅឯណា?' },
    { id: 203, category: 'food', korean: '와인 바', english: 'Is there a wine bar nearby?', image: icons.bar, khmer: 'តើមានបារស្រានៅជិតនេះទេ?' },
    { id: 204, category: 'food', korean: '패스트푸드', english: 'I would like to eat fast food.', image: icons.fastFood, khmer: 'ខ្ញុំចង់ញ៉ាំអាហាររហ័ស។' },
    { id: 205, category: 'food', korean: '마트', english: 'Where is the nearest supermarket?', image: icons.store, khmer: 'តើផ្សារទំនើបដែលនៅជិតបំផុតនៅឯណា?' },
    { id: 206, category: 'food', korean: '테이크아웃', english: 'Can I get this to go?', image: icons.takeout, khmer: 'តើខ្ញុំអាចយកកញ្ចប់បានទេ?' },
    { id: 207, category: 'food', korean: '채식 비건', english: 'Do you have vegan options?', image: icons.vegan, khmer: 'តើអ្នកមានជម្រើសអាហារបួសទេ?' },
    { id: 208, category: 'food', korean: '빵집', english: 'Where is the nearest bakery?', image: icons.bakery, khmer: 'តើហាងនំប៉័ងដែលនៅជិតបំផុតនៅឯណា?' },
    { id: 209, category: 'food', korean: '물병', english: 'Can I have a bottle of water?', image: icons.water, khmer: 'តើខ្ញុំអាចសុំទឹកដបបានទេ?' },

    // 3. 교통
    { id: 301, category: 'transport', korean: '공항', english: 'How do I get to the airport?', image: icons.airport, khmer: 'តើខ្ញុំទៅព្រលានយន្តហោះដោយរបៀបណា?' },
    { id: 302, category: 'transport', korean: '기차', english: 'Where is the train station?', image: icons.train, khmer: 'តើស្ថានីយ៍រថភ្លើងនៅឯណា?' },
    { id: 303, category: 'transport', korean: '지하철', english: 'Where is the subway station?', image: icons.subway, khmer: 'តើស្ថានីយ៍រថភ្លើងក្រោមដីនៅឯណា?' },
    { id: 304, category: 'transport', korean: '버스', english: 'Where is the bus stop?', image: icons.busStop, khmer: 'តើចំណតឡានក្រុងនៅឯណា?' },
    { id: 305, category: 'transport', korean: '택시', english: 'Could you call a taxi for me?', image: icons.taxi, khmer: 'តើអ្នកអាចហៅតាក់ស៊ីឱ្យខ្ញុំបានទេ?' },
    { id: 306, category: 'transport', korean: '렌터카', english: 'I would like to rent a car.', image: icons.carRental, khmer: 'ខ្ញុំចង់ជួលឡាន។' },
    { id: 307, category: 'transport', korean: '주차장', english: 'Where is the parking lot?', image: icons.parking, khmer: 'តើចំណតរថយន្តនៅឯណា?' },
    { id: 308, category: 'transport', korean: '주유소', english: 'Where is the nearest gas station?', image: icons.gasStation, khmer: 'តើស្ថានីយ៍ប្រេងឥន្ធនៈដែលនៅជិតបំផុតនៅឯណា?' },
    { id: 309, category: 'transport', korean: '항구, 배', english: 'How do I get to the port?', image: icons.harbor, khmer: 'តើខ្ញុំទៅកំពង់ផែដោយរបៀបណា?' },
    { id: 310, category: 'transport', korean: '자전거', english: 'Where can I rent a bicycle?', image: icons.bicycle, khmer: 'តើខ្ញុំអាចជួលកង់នៅឯណា?' },

    // 4. 응급/안전
    { id: 401, category: 'emergency', korean: '병원', english: 'Where is the nearest hospital?', image: icons.hospital, khmer: 'តើមន្ទីរពេទ្យដែលនៅជិតបំផុតនៅឯណា?' },
    { id: 402, category: 'emergency', korean: '약국', english: 'Where is the nearest pharmacy?', image: icons.pharmacy, khmer: 'តើឱសថស្ថានដែលនៅជិតបំផុតនៅឯណា?' },
    { id: 403, category: 'emergency', korean: '대사관', english: 'Where is my country\'s embassy?', image: icons.embassy, khmer: 'តើស្ថានទូតប្រទេសរបស់ខ្ញុំនៅឯណា?' },
    { id: 404, category: 'emergency', korean: '경찰서', english: 'Where is the police station?', image: icons.police, khmer: 'តើស្ថានីយ៍ប៉ូលីសនៅឯណា?' },
    { id: 405, category: 'emergency', korean: '구급상자', english: 'I need a first aid kit.', image: icons.firstAid, khmer: 'ខ្ញុំត្រូវការប្រអប់សង្គ្រោះបឋម។' },
    { id: 406, category: 'emergency', korean: '제세동기', english: 'Where is the AED?', image: icons.aed, khmer: 'តើម៉ាស៊ីន AED នៅឯណា?' },
    { id: 407, category: 'emergency', korean: '비상구', english: 'Where is the emergency exit?', image: icons.emergencyExit, khmer: 'តើច្រកចេញបន្ទាន់នៅឯណា?' },
    { id: 408, category: 'emergency', korean: '소화기', english: 'Where is the fire extinguisher?', image: icons.fireExtinguisher, khmer: 'តើបំពង់ពន្លត់អគ្គីភ័យនៅឯណា?' },
    { id: 409, category: 'emergency', korean: '분실물 센터', english: 'Where is the lost and found?', image: icons.lostAndFound, khmer: 'តើកន្លែងបាត់ និងរកឃើញនៅឯណា?' },

    // 5. 쇼핑
    { id: 501, category: 'shopping', korean: '안내소', english: 'Where is the information desk?', image: icons.information, khmer: 'តើកន្លែងផ្តល់ព័ត៌មាននៅឯណា?' },
    { id: 502, category: 'shopping', korean: '티켓', english: 'Where can I buy a ticket?', image: icons.ticket, khmer: 'តើខ្ញុំអាចទិញសំបុត្រនៅឯណា?' },
    { id: 503, category: 'shopping', korean: 'ATM', english: 'Where is the nearest ATM?', image: icons.atm, khmer: 'តើម៉ាស៊ីន ATM ដែលនៅជិតបំផុតនៅឯណា?' },
    { id: 504, category: 'shopping', korean: '환전', english: 'Where can I exchange currency?', image: icons.currencyExchange, khmer: 'តើខ្ញុំអាចប្តូរប្រាក់នៅឯណា?' },
    { id: 505, category: 'shopping', korean: '우체국', english: 'Where is the post office?', image: icons.postOffice, khmer: 'តើប៉ុស្តិ៍ប្រៃសណីយ៍នៅឯណា?' },
    { id: 506, category: 'shopping', korean: '세탁', english: 'Where is a laundromat?', image: icons.laundromat, khmer: 'តើកន្លែងបោកអ៊ុតនៅឯណា?' },
    { id: 507, category: 'shopping', korean: '미용실', english: 'Is there a hair salon nearby?', image: icons.salon, khmer: 'តើមានហាងធ្វើសក់នៅជិតនេះទេ?' },
    { id: 508, category: 'shopping', korean: '탈의실', english: 'Where is the fitting room?', image: icons.fittingRoom, khmer: 'តើបន្ទប់សាកសម្លៀកបំពាក់នៅឯណា?' },
    { id: 509, category: 'shopping', korean: '쇼핑백', english: 'I want to go shopping.', image: icons.shoppingBag, khmer: 'ខ្ញុំចង់ទៅទិញអីវ៉ាន់។' },

    // 6. 관광/여가
    { id: 601, category: 'tourism', korean: '박물관', english: 'Where is the museum?', image: icons.museum, khmer: 'តើសារមន្ទីរនៅឯណា?' },
    { id: 602, category: 'tourism', korean: '미술관', english: 'Where is the art gallery?', image: icons.gallery, khmer: 'តើវិចិត្រសាលសិល្បៈនៅឯណា?' },
    { id: 603, category: 'tourism', korean: '극장', english: 'I want to go to the theater.', image: icons.cinema, khmer: 'ខ្ញុំចង់ទៅរោងកុន។' },
    { id: 604, category: 'tourism', korean: '전망대', english: 'How do I get to the observatory?', image: icons.observatory, khmer: 'តើខ្ញុំទៅកន្លែងទស្សនាដោយរបៀបណា?' },
    { id: 605, category: 'tourism', korean: '사진', english: 'Can I take a picture here?', image: icons.photography, khmer: 'តើខ្ញុំអាចថតរូបនៅទីនេះបានទេ?' },
    { id: 606, category: 'tourism', korean: '공원', english: 'Where is the nearest park?', image: icons.park, khmer: 'តើ-សួន-ច្បារ-ដែល-នៅ-ជិត-បំផុត-នៅ-ឯ-ណា?' },
    { id: 607, category: 'tourism', korean: '해변', english: 'How do I get to the beach?', image: icons.beach, khmer: 'តើខ្ញុំទៅឆ្នេរដោយរបៀបណា?' },
    { id: 608, category: 'tourism', korean: '등산로', english: 'I want to go hiking.', image: icons.hiking, khmer: 'ខ្ញុំចង់ទៅដើរป่า។' },
    { id: 609, category: 'tourism', korean: '수영장', english: 'Is there a swimming pool?', image: icons.swimmingPool, khmer: 'តើមានអាងហែលទឹកទេ?' },
    { id: 610, category: 'tourism', korean: '사원', english: 'Where is the temple?', image: icons.temple, khmer: 'តើប្រាសាទនៅឯណា?' },

    // 7. 숙소
    { id: 701, category: 'accommodation', korean: '프런트 데스크', english: 'Where is the front desk?', image: icons.frontDesk, khmer: 'តើកន្លែងទទួលភ្ញៀវនៅឯណា?' },
    { id: 702, category: 'accommodation', korean: '객실 열쇠', english: 'I lost my room key.', image: icons.keyCard, khmer: 'ខ្ញុំបាត់សោបន្ទប់។' },
    { id: 703, category: 'accommodation', korean: '룸서비스', english: 'I would like to order room service.', image: icons.roomService, khmer: 'ខ្ញុំចង់កុម្ម៉ង់សេវាកម្មបន្ទប់។' },
    { id: 704, category: 'accommodation', korean: '청소 요청', english: 'Please clean my room.', image: icons.housekeeping, khmer: 'សូមសម្អាតបន្ទប់របស់ខ្ញុំ។' },
    { id: 705, category: 'accommodation', korean: '수건', english: 'Can I have more towels?', image: icons.towel, khmer: 'តើខ្ញុំអាចសុំកន្សែងបន្ថែមបានទេ?' },
    { id: 706, category: 'accommodation', korean: '에어컨', english: 'The air conditioner is not working.', image: icons.airConditioner, khmer: 'ម៉ាស៊ីនត្រជាក់មិនដំណើរការទេ។' },
    { id: 707, category: 'accommodation', korean: '난방', english: 'The heating is not working.', image: icons.heating, khmer: 'ម៉ាស៊ីនកម្តៅមិនដំណើរការទេ។' },
    { id: 708, category: 'accommodation', korean: '짐 보관', english: 'Can I store my luggage here?', image: icons.luggageStorage, khmer: 'តើខ្ញុំអាចទុកអីវ៉ាន់នៅទីនេះបានទេ?' },
    { id: 709, category: 'accommodation', korean: '객실 찾기', english: 'How do I get to my room?', image: icons.findRoom, khmer: 'តើខ្ញុំទៅបន្ទប់របស់ខ្ញុំដោយរបៀបណា?' },
    { id: 710, category: 'accommodation', korean: '체크아웃', english: 'I would like to check out.', image: icons.checkout, khmer: 'ខ្ញុំចង់គិតលុយចេញ។' },
];