/**
 * @file 모든 픽토그램 이미지 애셋(asset)을 한 곳에서 모아 export하는 배럴 파일입니다.
 *       이 파일을 통해 다른 컴포넌트에서는 `import * as icons from '...'` 형태로
 *       모든 아이콘을 한 번에 불러와 `icons.restroom`과 같이 사용할 수 있습니다.
 *
 * @description `export { default as ... } from '...'` 구문은
 *              이미지 파일을 불러와서(import) 동시에 원하는 이름으로 내보내는(export) 역할을 합니다.
 */

// --- 1. 편의시설 (Facilities) ---
export { default as restroom } from './1-1.png'; // 화장실
export { default as wifi } from './1-2.png'; // 와이파이
export { default as charging } from './1-3.png'; // 휴대폰 충전
export { default as powerOutlet } from './1-4.png'; // 콘센트
export { default as locker } from './1-5.png'; // 캐비닛
export { default as elevator } from './1-6.png'; // 엘리베이터
export { default as escalator } from './1-7.png'; // 에스컬레이터
export { default as drinkingFountain } from './1-8.jpg'; // 음수대
export { default as nursery } from './1-9.png'; // 수유실
export { default as accessibility } from './1-10.png'; // 휠체어
export { default as wheelchairRamp } from './1-11.png'; // 휠체어 리프트
export { default as accessibleRestroom } from './1-12.png'; // 장애인 휠체어 화장실

// --- 2. 식당 & 음료 (Food & Beverage) ---
export { default as restaurant } from './2-1.png'; // 식당
export { default as cafe } from './2-2.png'; // 커피, 차
export { default as bar } from './2-3.png'; // 와인 바
export { default as fastFood } from './2-4.png'; // 패스트푸드
export { default as store } from './2-5.png'; // 마트
export { default as takeout } from './2-6.png'; // 테이크아웃
export { default as vegan } from './2-7.png'; // 채식 비건
export { default as bakery } from './2-8.png'; // 빵집
export { default as water } from './2-9.png'; // 물병

// --- 3. 교통 (Transportation) ---
export { default as airport } from './3-1.png'; // 공항
export { default as train } from './3-2.png'; // 기차
export { default as subway } from './3-3.png'; // 지하철
export { default as busStop } from './3-4.png'; // 버스
export { default as taxi } from './3-5.png'; // 택시
export { default as carRental } from './3-6.png'; // 렌터카
export { default as parking } from './3-7.png'; // 주차장
export { default as gasStation } from './3-8.png'; // 주유소
export { default as harbor } from './3-9.png'; // 항구, 배, 페리
export { default as bicycle } from './3-10.png'; // 자전거

// --- 4. 응급 & 안전 (Emergency) ---
export { default as hospital } from './4-1.png'; // 병원
export { default as pharmacy } from './4-2.png'; // 약국
export { default as embassy } from './4-3.png'; // 대사관
export { default as police } from './4-4.png'; // 경찰서
export { default as firstAid } from './4-5.png'; // 구급상자
export { default as aed } from './4-6.png'; // 제세동기
export { default as emergencyExit } from './4-7.png'; // 비상구
export { default as fireExtinguisher } from './4-8.png'; // 소화기
export { default as lostAndFound } from './4-9.png'; // 분실물 센터

// --- 5. 쇼핑 & 서비스 (Shopping & Services) ---
export { default as information } from './5-1.png'; // 안내소
export { default as ticket } from './5-2.png'; // 티켓
export { default as atm } from './5-3.png'; // ATM
export { default as currencyExchange } from './5-4.png'; // 환전
export { default as postOffice } from './5-5.png'; // 우체국
export { default as laundromat } from './5-6.png'; // 세탁
export { default as salon } from './5-7.png'; // 미용실
export { default as fittingRoom } from './5-8.png'; // 탈의실
export { default as shoppingBag } from './5-9.png'; // 쇼핑백

// --- 6. 관광 & 여가 (Tourism) ---
export { default as museum } from './6-1.png'; // 박물관
export { default as gallery } from './6-2.png'; // 미술관
export { default as cinema } from './6-3.png'; // 극장
export { default as observatory } from './6-4.png'; // 전망대
export { default as photography } from './6-5.png'; // 사진
export { default as park } from './6-6.png'; // 공원
export { default as beach } from './6-7.png'; // 해변
export { default as hiking } from './6-8.png'; // 등산로
export { default as swimmingPool } from './6-9.png'; // 수영장
export { default as temple } from './6-10.png'; // 사원

// --- 7. 숙소 (Accommodation) ---
export { default as frontDesk } from './7-1.png'; // 안내 프런트 데스크
export { default as keyCard } from './7-2.png'; // 객실 열쇠, 카드 키
export { default as roomService } from './7-3.png'; // 룸서비스
export { default as housekeeping } from './7-4.png'; // 청소 요청
export { default as towel } from './7-5.png'; // 수건
export { default as airConditioner } from './7-6.png'; // 에어컨
export { default as heating } from './7-7.png'; // 난방
export { default as luggageStorage } from './7-8.png'; // 짐 보관
export { default as findRoom } from './7-9.png'; // 객실 찾기
export { default as checkout } from './7-10.png'; // 체크아웃