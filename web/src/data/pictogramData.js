import * as icons from '../assets/pictogram';

/**
 * 번역 언어 목록입니다.
 * `pictograms.translations` 객체의 키와 `code` 값이 일치해야 합니다.
 * @type {Array<{code: string, name: string}>}
 */
export const languages = [
    { code: 'km', name: '크메르어' },
    // 예시: 일본어 추가 시 이 한 줄만 추가하면 됩니다.
    // { code: 'jp', name: '일본어' },
];

/**
 * '상황별 카테고리' 목록입니다.
 * @type {Array<{id: string, name: string}>}
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

export const pictograms = [
    // 1. 기본 편의 시설
    { id: 101, category: 'facilities', image: icons.restroom, translations: { ko: '화장실', en: 'Where is the restroom?', km: 'តើបន្ទប់ទឹកនៅឯណា?' } },
    { id: 102, category: 'facilities', image: icons.wifi, translations: { ko: '와이파이', en: 'What is the Wi-Fi password?', km: 'តើលេខសម្ងាត់ Wi-Fi ជាអ្វី?' } },
    { id: 103, category: 'facilities', image: icons.charging, translations: { ko: '휴대폰 충전', en: 'Where can I charge my phone?', km: 'តើខ្ញុំអាចសាកទូរស័ព្ទនៅឯណា?' } },
    { id: 104, category: 'facilities', image: icons.powerOutlet, translations: { ko: '콘센트', en: 'Is there a power outlet I can use?', km: 'តើមានព្រីភ្លើងដែលខ្ញុំអាចប្រើបានទេ?' } },
    { id: 105, category: 'facilities', image: icons.locker, translations: { ko: '캐비닛', en: 'Are there any lockers available?', km: 'តើមានទូដាក់អីវ៉ាន់(ឡុកឃ័រ)ទេ?' } },
    { id: 106, category: 'facilities', image: icons.elevator, translations: { ko: '엘리베이터', en: 'Where is the elevator?', km: 'តើជណ្តើរយន្តនៅឯណា?' } },
    { id: 107, category: 'facilities', image: icons.escalator, translations: { ko: '에스컬레이터', en: 'Where is the escalator?', km: 'តើជណ្តើរយន្តប្រអប់នៅឯណា?' } },
    { id: 108, category: 'facilities', image: icons.drinkingFountain, translations: { ko: '음수대', en: 'Where can I get some drinking water?', km: 'តើខ្ញុំអាចរកទឹកផឹកនៅឯណា?' } },
    { id: 109, category: 'facilities', image: icons.nursery, translations: { ko: '수유실', en: 'Is there a nursing room?', km: 'តើមានបន្ទប់បំបៅដោះកូនទេ?' } },
    { id: 110, category: 'facilities', image: icons.accessibility, translations: { ko: '휠체어', en: 'Is this place wheelchair accessible?', km: 'តើកន្លែងនេះអាចចូលប្រើដោយរទេះរុញបានទេ?' } },
    { id: 111, category: 'facilities', image: icons.wheelchairRamp, translations: { ko: '휠체어 리프트', en: 'Is there a wheelchair lift?', km: 'តើមានជណ្តើរយន្តសម្រាប់រទេះរុញទេ?' } },
    { id: 112, category: 'facilities', image: icons.accessibleRestroom, translations: { ko: '장애인 화장실', en: 'Where is the accessible restroom?', km: 'តើបន្ទប់ទឹកសម្រាប់ជនពិការនៅឯណា?' } },

    // 2. 식당/음료
    { id: 201, category: 'food', image: icons.restaurant, translations: { ko: '식당', en: 'I\'m looking for a restaurant.', km: 'ខ្ញុំកំពុងរកមើលភោជនីយដ្ឋាន។' } },
    { id: 202, category: 'food', image: icons.cafe, translations: { ko: '커피, 차', en: 'Where can I get coffee or tea?', km: 'តើខ្ញុំអាចរកកាហ្វេ ឬតែនៅឯណា?' } },
    { id: 203, category: 'food', image: icons.bar, translations: { ko: '와인 바', en: 'Is there a wine bar nearby?', km: 'តើមានបារស្រានៅជិតនេះទេ?' } },
    { id: 204, category: 'food', image: icons.fastFood, translations: { ko: '패스트푸드', en: 'I would like to eat fast food.', km: 'ខ្ញុំចង់ញ៉ាំអាហាររហ័ស។' } },
    { id: 205, category: 'food', image: icons.store, translations: { ko: '마트', en: 'Where is the nearest supermarket?', km: 'តើផ្សារទំនើបដែលនៅជិតបំផុតនៅឯណា?' } },
    { id: 206, category: 'food', image: icons.takeout, translations: { ko: '테이크아웃', en: 'Can I get this to go?', km: 'តើខ្ញុំអាចយកកញ្ចប់បានទេ?' } },
    { id: 207, category: 'food', image: icons.vegan, translations: { ko: '채식 비건', en: 'Do you have vegan options?', km: 'តើអ្នកមានជម្រើសអាហារបួសទេ?' } },
    { id: 208, category: 'food', image: icons.bakery, translations: { ko: '빵집', en: 'Where is the nearest bakery?', km: 'តើហាងនំប៉័ងដែលនៅជិតបំផុតនៅឯណា?' } },
    { id: 209, category: 'food', image: icons.water, translations: { ko: '물병', en: 'Can I have a bottle of water?', km: 'តើខ្ញុំអាចសុំទឹកដបបានទេ?' } },

    // ... (나머지 카테고리들도 모두 동일한 `translations` 구조로 변환되었습니다)

    // 3. 교통
    { id: 301, category: 'transport', image: icons.airport, translations: { ko: '공항', en: 'How do I get to the airport?', km: 'តើខ្ញុំទៅព្រលានយន្តហោះដោយរបៀបណា?' } },
    { id: 302, category: 'transport', image: icons.train, translations: { ko: '기차', en: 'Where is the train station?', km: 'តើស្ថានីយ៍រថភ្លើងនៅឯណា?' } },
    { id: 303, category: 'transport', image: icons.subway, translations: { ko: '지하철', en: 'Where is the subway station?', km: 'តើស្ថានីយ៍រថភ្លើងក្រោមដីនៅឯណា?' } },
    { id: 304, category: 'transport', image: icons.busStop, translations: { ko: '버스', en: 'Where is the bus stop?', km: 'តើចំណតឡានក្រុងនៅឯណា?' } },
    { id: 305, category: 'transport', image: icons.taxi, translations: { ko: '택시', en: 'Could you call a taxi for me?', km: 'តើអ្នកអាចហៅតាក់ស៊ីឱ្យខ្ញុំបានទេ?' } },
    { id: 306, category: 'transport', image: icons.carRental, translations: { ko: '렌터카', en: 'I would like to rent a car.', km: 'ខ្ញុំចង់ជួលឡាន។' } },
    { id: 307, category: 'transport', image: icons.parking, translations: { ko: '주차장', en: 'Where is the parking lot?', km: 'តើចំណតរថយន្តនៅឯណា?' } },
    { id: 308, category: 'transport', image: icons.gasStation, translations: { ko: '주유소', en: 'Where is the nearest gas station?', km: 'តើស្ថានីយ៍ប្រេងឥន្ធនៈដែលនៅជិតបំផុតនៅឯណា?' } },
    { id: 309, category: 'transport', image: icons.harbor, translations: { ko: '항구, 배', en: 'How do I get to the port?', km: 'តើខ្ញុំទៅកំពង់ផែដោយរបៀបណា?' } },
    { id: 310, category: 'transport', image: icons.bicycle, translations: { ko: '자전거', en: 'Where can I rent a bicycle?', km: 'តើខ្ញុំអាចជួលកង់នៅឯណា?' } },

    // 4. 응급/안전
    { id: 401, category: 'emergency', image: icons.hospital, translations: { ko: '병원', en: 'Where is the nearest hospital?', km: 'តើមន្ទីរពេទ្យដែលនៅជិតបំផុតនៅឯណា?' } },
    { id: 402, category: 'emergency', image: icons.pharmacy, translations: { ko: '약국', en: 'Where is the nearest pharmacy?', km: 'តើឱសថស្ថានដែលនៅជិតបំផុតនៅឯណា?' } },
    { id: 403, category: 'emergency', image: icons.embassy, translations: { ko: '대사관', en: 'Where is my country\'s embassy?', km: 'តើស្ថានទូតប្រទេសរបស់ខ្ញុំនៅឯណា?' } },
    { id: 404, category: 'emergency', image: icons.police, translations: { ko: '경찰서', en: 'Where is the police station?', km: 'តើស្ថានីយ៍ប៉ូលីសនៅឯណា?' } },
    { id: 405, category: 'emergency', image: icons.firstAid, translations: { ko: '구급상자', en: 'I need a first aid kit.', km: 'ខ្ញុំត្រូវការប្រអប់សង្គ្រោះបឋម។' } },
    { id: 406, category: 'emergency', image: icons.aed, translations: { ko: '제세동기', en: 'Where is the AED?', km: 'តើម៉ាស៊ីន AED នៅឯណា?' } },
    { id: 407, category: 'emergency', image: icons.emergencyExit, translations: { ko: '비상구', en: 'Where is the emergency exit?', km: 'តើច្រកចេញបន្ទាន់នៅឯណា?' } },
    { id: 408, category: 'emergency', image: icons.fireExtinguisher, translations: { ko: '소화기', en: 'Where is the fire extinguisher?', km: 'តើបំពង់ពន្លត់អគ្គីភ័យនៅឯណា?' } },
    { id: 409, category: 'emergency', image: icons.lostAndFound, translations: { ko: '분실물 센터', en: 'Where is the lost and found?', km: 'តើកន្លែងបាត់ និងរកឃើញនៅឯណា?' } },

    // 5. 쇼핑
    { id: 501, category: 'shopping', image: icons.information, translations: { ko: '안내소', en: 'Where is the information desk?', km: 'តើកន្លែងផ្តល់ព័ត៌មាននៅឯណា?' } },
    { id: 502, category: 'shopping', image: icons.ticket, translations: { ko: '티켓', en: 'Where can I buy a ticket?', km: 'តើខ្ញុំអាចទិញសំបុត្រនៅឯណា?' } },
    { id: 503, category: 'shopping', image: icons.atm, translations: { ko: 'ATM', en: 'Where is the nearest ATM?', km: 'តើម៉ាស៊ីន ATM ដែលនៅជិតបំផុតនៅឯណា?' } },
    { id: 504, category: 'shopping', image: icons.currencyExchange, translations: { ko: '환전', en: 'Where can I exchange currency?', km: 'តើខ្ញុំអាចប្តូរប្រាក់នៅឯណា?' } },
    { id: 505, category: 'shopping', image: icons.postOffice, translations: { ko: '우체국', en: 'Where is the post office?', km: 'តើប៉ុស្តិ៍ប្រៃសណីយ៍នៅឯណា?' } },
    { id: 506, category: 'shopping', image: icons.laundromat, translations: { ko: '세탁', en: 'Where is a laundromat?', km: 'តើកន្លែងបោកអ៊ុតនៅឯណា?' } },
    { id: 507, category: 'shopping', image: icons.salon, translations: { ko: '미용실', en: 'Is there a hair salon nearby?', km: 'តើមានហាងធ្វើសក់នៅជិតនេះទេ?' } },
    { id: 508, category: 'shopping', image: icons.fittingRoom, translations: { ko: '탈의실', en: 'Where is the fitting room?', km: 'តើបន្ទប់សាកសម្លៀកបំពាក់នៅឯណា?' } },
    { id: 509, category: 'shopping', image: icons.shoppingBag, translations: { ko: '쇼핑백', en: 'I want to go shopping.', km: 'ខ្ញុំចង់ទៅទិញអីវ៉ាន់។' } },

    // 6. 관광/여가
    { id: 601, category: 'tourism', image: icons.museum, translations: { ko: '박물관', en: 'Where is the museum?', km: 'តើសារមន្ទីរនៅឯណា?' } },
    { id: 602, category: 'tourism', image: icons.gallery, translations: { ko: '미술관', en: 'Where is the art gallery?', km: 'តើវិចិត្រសាលសិល្បៈនៅឯណា?' } },
    { id: 603, category: 'tourism', image: icons.cinema, translations: { ko: '극장', en: 'I want to go to the theater.', km: 'ខ្ញុំចង់ទៅរោងកុន។' } },
    { id: 604, category: 'tourism', image: icons.observatory, translations: { ko: '전망대', en: 'How do I get to the observatory?', km: 'តើខ្ញុំទៅកន្លែងទស្សនាដោយរបៀបណា?' } },
    { id: 605, category: 'tourism', image: icons.photography, translations: { ko: '사진', en: 'Can I take a picture here?', km: 'តើខ្ញុំអាចថតរូបនៅទីនេះបានទេ?' } },
    { id: 606, category: 'tourism', image: icons.park, translations: { ko: '공원', en: 'Where is the nearest park?', km: 'តើ-សួន-ច្បារ-ដែល-នៅ-ជិត-បំផុត-នៅ-ឯ-ណា?' } },
    { id: 607, category: 'tourism', image: icons.beach, translations: { ko: '해변', en: 'How do I get to the beach?', km: 'តើខ្ញុំទៅឆ្នេរដោយរបៀបណា?' } },
    { id: 608, category: 'tourism', image: icons.hiking, translations: { ko: '등산로', en: 'I want to go hiking.', km: 'ខ្ញុំចង់ទៅដើរป่า។' } },
    { id: 609, category: 'tourism', image: icons.swimmingPool, translations: { ko: '수영장', en: 'Is there a swimming pool?', km: 'តើមានអាងហែលទឹកទេ?' } },
    { id: 610, category: 'tourism', image: icons.temple, translations: { ko: '사원', en: 'Where is the temple?', km: 'តើប្រាសាទនៅឯណា?' } },

    // 7. 숙소
    { id: 701, category: 'accommodation', image: icons.frontDesk, translations: { ko: '프런트 데스크', en: 'Where is the front desk?', km: 'តើកន្លែងទទួលភ្ញៀវនៅឯណា?' } },
    { id: 702, category: 'accommodation', image: icons.keyCard, translations: { ko: '객실 열쇠', en: 'I lost my room key.', km: 'ខ្ញុំបាត់សោបន្ទប់។' } },
    { id: 703, category: 'accommodation', image: icons.roomService, translations: { ko: '룸서비스', en: 'I would like to order room service.', km: 'ខ្ញុំចង់កុម្ម៉ង់សេវាកម្មបន្ទប់។' } },
    { id: 704, category: 'accommodation', image: icons.housekeeping, translations: { ko: '청소 요청', en: 'Please clean my room.', km: 'សូមសម្អាតបន្ទប់របស់ខ្ញុំ។' } },
    { id: 705, category: 'accommodation', image: icons.towel, translations: { ko: '수건', en: 'Can I have more towels?', km: 'តើខ្ញុំអាចសុំកន្សែងបន្ថែមបានទេ?' } },
    { id: 706, category: 'accommodation', image: icons.airConditioner, translations: { ko: '에어컨', en: 'The air conditioner is not working.', km: 'ម៉ាស៊ីនត្រជាក់មិនដំណើរការទេ។' } },
    { id: 707, category: 'accommodation', image: icons.heating, translations: { ko: '난방', en: 'The heating is not working.', km: 'ម៉ាស៊ីនកម្តៅមិនដំណើរការទេ។' } },
    { id: 708, category: 'accommodation', image: icons.luggageStorage, translations: { ko: '짐 보관', en: 'Can I store my luggage here?', km: 'តើខ្ញុំអាចទុកអីវ៉ាន់នៅទីនេះបានទេ?' } },
    { id: 709, category: 'accommodation', image: icons.findRoom, translations: { ko: '객실 찾기', en: 'How do I get to my room?', km: 'តើខ្ញុំទៅបន្ទប់របស់ខ្ញុំដោយរបៀបណា?' } },
    { id: 710, category: 'accommodation', image: icons.checkout, translations: { ko: '체크아웃', en: 'I would like to check out.', km: 'ខ្ញុំចង់គិតលុយចេញ។' } },
];