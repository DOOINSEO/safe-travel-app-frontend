/**
 * @file 사용자 계정 정보(연락처, 메시지 등)와 관련된 모든 서버 통신(API 요청)을 중앙에서 관리하는 모듈입니다.
 *       이 파일은 '서비스 계층(Service Layer)'으로서, UI 컴포넌트와 백엔드 서버 사이의 중개자 역할을 합니다.
 *       컴포넌트는 이 파일의 함수를 호출하기만 하면 되고, 실제 API 엔드포인트나 데이터 구조에 대해서는 알 필요가 없습니다.
 */

// --- API 기본 설정 ---
// TODO: 백엔드 개발이 완료되면 실제 서버의 기본 URL로 변경해야 합니다.
const API_BASE_URL = '/api/account';

// --- 데이터 변환 함수 ---
// 백엔드와 프론트엔드의 데이터 구조 차이를 여기서 흡수합니다.

/**
 * @description 서버 응답 데이터를 프론트엔드에 맞게 변환합니다. (예: snake_case -> camelCase)
 * @param {object} serverData - 백엔드로부터 받은 원본 데이터
 * @returns {object} 프론트엔드에서 사용할 데이터
 */
const transformUserData = (serverData) => {
    // --- ⚙️ 백엔드 DB 컬럼명 또는 JSON 키 변경 시 수정 지점 ⚙️ ---
    // 백엔드의 응답 데이터 키가 변경되면 이 부분만 수정하면 됩니다.
    // 예: serverData.user_contacts -> serverData.emergency_contacts
    return {
        contacts: serverData.contacts || [],
        emergencyMessage: serverData.emergency_message || '',
    };
};


// --- API 요청 함수 (실제 통신 로직) ---

/**
 * @description 서버에서 사용자의 연락처 목록과 비상 메시지를 가져옵니다.
 * @returns {Promise<{contacts: string[], emergencyMessage: string}>} 변환된 사용자 데이터
 */
export const getUserAccountData = async () => {
    // TODO: 실제 API 로직 (주석 해제 후 사용)
    // const response = await fetch(`${API_BASE_URL}/user-data`);
    // if (!response.ok) throw new Error('사용자 정보를 불러오는데 실패했습니다.');
    // const serverData = await response.json();
    // return transformUserData(serverData);

    // --- 백엔드 구현 전 임시 데이터 ---
    console.log('API: getUserAccountData 호출됨 (임시 데이터 반환)');
    await new Promise(resolve => setTimeout(resolve, 500));

    // [수정] 임시 데이터도 transformUserData 함수를 거치도록 하여 경고를 해결하고 일관성을 유지합니다.
    const mockServerData = {
        contacts: ['010-1234-5678', '010-1111-2222'],
        emergency_message: "여기에 기존에 저장되어 있던 비상 메시지가 표시됩니다."
    };
    return transformUserData(mockServerData);
};

/**
 * @description 새로운 비상 연락처를 서버에 추가합니다.
 * @param {string} newContact - 추가할 연락처
 */
export const addContact = async (newContact) => {
    // TODO: 실제 API 로직 구현
    console.log(`API: addContact 호출됨, 데이터: ${newContact}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, contact: newContact };
};

/**
 * @description 특정 비상 연락처를 서버에서 삭제합니다.
 * @param {string} contactToRemove - 삭제할 연락처
 */
export const deleteContact = async (contactToRemove) => {
    // TODO: 실제 API 로직 구현
    console.log(`API: deleteContact 호출됨, 데이터: ${contactToRemove}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
};

/**
 * @description 비상 메시지를 서버에 저장/업데이트합니다.
 * @param {string} message - 저장할 메시지
 */
export const saveEmergencyMessage = async (message) => {
    // TODO: 실제 API 로직 구현
    console.log(`API: saveEmergencyMessage 호출됨, 메시지: ${message}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
};