/**
 * @file 데이터 포맷팅과 관련된 유틸리티 함수들을 관리하는 파일입니다.
 */

/**
 * @description 숫자 문자열을 전화번호 형식(예: 010-1234-5678)으로 자동 변환합니다.
 * @param {string} value - 숫자만 있는 전화번호 문자열
 * @returns {string} 하이픈이 추가된 전화번호 문자열
 */
export const formatPhoneNumber = (value) => {
    if (!value) return '';
    const phoneNumber = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 모두 제거

    // 11자리 휴대폰 번호 형식에 맞춰 하이픈 추가
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 8) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};