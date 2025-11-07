/**
 * @file 사용자 계정 정보(프로필, 연락처, 메시지 등)와 관련된 모든 서버 통신(API 요청)을 중앙에서 관리하는 모듈입니다.
 *       이 파일은 '서비스 계층(Service Layer)'으로서, UI 컴포넌트와 백엔드 서버 사이의 중개자 역할을 합니다.
 *       컴포넌트는 이 파일의 함수를 호출하기만 하면 되고, 실제 API 엔드포인트나 데이터 구조에 대해서는 알 필요가 없습니다.
 */

// --- API 기본 설정 ---
// TODO: 백엔드 개발이 완료되면 실제 서버의 기본 URL로 변경해야 합니다.
// eslint-disable-next-line no-unused-vars
const API_BASE_URL = '/api';

// --- 데이터 변환 함수 ---
// 백엔드와 프론트엔드의 데이터 구조 차이를 여기서 흡수합니다.

/**
 * @description '내 정보' 페이지에 필요한 서버 응답 데이터를 프론트엔드용으로 변환합니다.
 * @param {object} serverData - 백엔드로부터 받은 원본 데이터
 * @returns {object} 프론트엔드에서 사용할 데이터
 */
const transformMyPageData = (serverData) => {
    // --- ⚙️ 백엔드 DB 컬럼명 또는 JSON 키 변경 시 수정 지점 ⚙️ ---
    return {
        contacts: serverData.contacts || [],
        emergencyMessage: serverData.emergency_message || '',
    };
};

/**
 * @description '계정 관리' 페이지에 필요한 서버 응답 데이터(회원 정보)를 프론트엔드용으로 변환합니다.
 * @param {object} serverData - 백엔드로부터 받은 원본 데이터
 * @returns {object} 프론트엔드에서 사용할 데이터 (예: nickname)
 */
const transformUserProfile = (serverData) => {
    // --- ⚙️ 백엔드 DB 컬럼명 또는 JSON 키 변경 시 수정 지점 ⚙️ ---
    const { body } = serverData;
    return {
        id: body.id,
        loginId: body.loginId,
        name: body.name,
        phone: body.phone,
        nickname: body.nickname,
        alarmEnabled: body.alarmEnabled,
        role: body.role,
    };
};


// --- API 요청 함수 (실제 통신 로직) ---

/**
 * @description 서버에서 '내 정보' 페이지에 필요한 데이터(연락처, 메시지)를 가져옵니다.
 * @returns {Promise<{contacts: string[], emergencyMessage: string}>}
 */
export const getUserAccountData = async () => {
    // TODO: 실제 API 엔드포인트로 수정. 예: `${API_BASE_URL}/account/my-page-data`
    // const response = await fetch(...);
    // const serverData = await response.json();
    // return transformMyPageData(serverData);

    // --- 백엔드 구현 전 임시 데이터 ---
    console.log('API: getUserAccountData 호출됨 (임시 데이터 반환)');
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockServerData = {
        contacts: ['010-1234-5678', '010-1111-2222'],
        emergency_message: "여기에 기존에 저장되어 있던 비상 메시지가 표시됩니다."
    };
    return transformMyPageData(mockServerData);
};

/**
 * @description 특정 사용자의 상세 프로필 정보를 서버에 요청합니다. (계정 관리 페이지용)
 * @param {string} userId - 조회할 사용자의 ID
 * @returns {Promise<object>} 변환된 사용자 프로필 데이터
 */
export const getUserProfile = async (userId) => {
    // TODO: 실제 API 엔드포인트로 수정. 예: `${API_BASE_URL}/user/${userId}`
    // const response = await fetch(...);
    // const serverData = await response.json();
    // return transformUserProfile(serverData);

    // --- 백엔드 구현 전 임시 데이터 ---
    console.log(`API: getUserProfile 호출됨, userId: ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockServerData = {
        isSuccess: true,
        message: "성공",
        body: {
            id: 1,
            loginId: "testuser",
            name: "홍길동",
            phone: "010-1234-5678",
            nickname: "길동이",
            alarmEnabled: true,
            role: "USER"
        }
    };
    return transformUserProfile(mockServerData);
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

// ... (향후 logout, updateUserProfile, updatePassword 등 다른 API 함수들을 여기에 추가할 수 있습니다)