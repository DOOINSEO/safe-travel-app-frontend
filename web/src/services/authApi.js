/**
 * @file 인증(Authentication) 관련 모든 API 요청 함수를 중앙에서 관리하는 서비스 모듈입니다.
 *       이 파일은 UI 컴포넌트(pages, components)와 백엔드 서버 사이의 '다리' 역할을 합니다.
 *       컴포넌트는 이 파일의 함수를 호출하기만 하면 되고, 실제 서버 통신 방식(fetch, axios 등)이나
 *       데이터 구조의 차이에 대해서는 알 필요가 없습니다.
 */

// --- API 기본 설정 ---

// 백엔드 API의 기본 주소입니다.
// TODO: 나중에 실제 서버 주소가 정해지면 이 값을 변경해야 합니다.
// 개발/운영 환경에 따라 주소를 다르게 설정하기 위해 .env 파일을 사용하는 것이 가장 좋습니다.
const API_BASE_URL = '/api/auth';

// --- 데이터 변환 함수 ---
// 이 함수들은 백엔드로부터 받은 데이터(snake_case 등)를 프론트엔드에서 사용하기 좋은 형태(camelCase)로 변환하는 역할을 합니다.

/**
 * @description 백엔드의 로그인 응답 데이터를 프론트엔드용 데이터 구조로 변환합니다.
 * @param {object} serverData - 백엔드 API로부터 받은 원본 데이터
 * @returns {{ accessToken: string, userName: string, userEmail: string }} 프론트엔드에서 사용할 데이터
 */
const transformLoginData = (serverData) => {
    // --- ⚙️ 백엔드 DB 컬럼명 또는 JSON 키 변경 시 수정 지점 ⚙️ ---
    // 만약 백엔드에서 보내주는 키 이름이 'user_name'이 아니라 'nickname'으로 변경된다면,
    // 이 함수의 'userName: serverData.user_name' 부분만 'userName: serverData.nickname'으로 수정하면 됩니다.
    // UI 컴포넌트는 전혀 수정할 필요가 없습니다.
    return {
        accessToken: serverData.token,
        userName: serverData.user_name,
        userEmail: serverData.user_email,
    };
};

/**
 * @description 백엔드의 회원가입 응답 데이터를 프론트엔드용 데이터 구조로 변환합니다.
 * @param {object} serverData - 백엔드 API로부터 받은 원본 데이터
 * @returns {object} 프론트엔드에서 사용할 데이터
 */
const transformSignUpData = (serverData) => {
    // --- ⚙️ 백엔드 DB 컬럼명 또는 JSON 키 변경 시 수정 지점 ⚙️ ---
    return {
        userId: serverData.user_id,
        message: serverData.message,
    };
};


// --- API 요청 함수 ---
// 이 함수들이 실제 서버와 통신하는 역할을 합니다.

/**
 * @description 사용자 이름과 비밀번호로 로그인을 시도하는 API 요청 함수입니다.
 * @param {string} username - 사용자가 입력한 아이디
 * @param {string} password - 사용자가 입력한 비밀번호
 * @returns {Promise<object>} 성공 시 프론트엔드에 맞게 변환된 사용자 데이터
 * @throws {Error} 로그인 실패 시, UI 컴포넌트에서 처리할 수 있도록 에러를 발생시킵니다.
 */
export const login = async (username, password) => {
    // 1. 서버에 보낼 요청 본문을 만듭니다.
    const requestBody = { username, password };

    // 2. 서버에 로그인 요청을 보냅니다.
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    });

    // 3. 응답이 실패(4xx, 5xx 에러)했는지 확인합니다.
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // 실패 시, UI 컴포넌트의 catch 블록으로 에러 메시지를 전달합니다.
        throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    // 4. 성공 응답을 변환하여 UI 컴포넌트로 반환합니다.
    const serverData = await response.json();
    return transformLoginData(serverData);
};

/**
 * @description 사용자 정보로 회원가입을 시도하는 API 요청 함수입니다.
 * @param {{ username, password }} userInfo - 회원가입에 필요한 사용자 정보
 * @returns {Promise<object>} 성공 시 프론트엔드에 맞게 변환된 응답 데이터
 * @throws {Error} 회원가입 실패 시 에러를 발생시킵니다.
 */
export const signup = async (userInfo) => {
    // 1. 서버에 보낼 요청 본문을 만듭니다.
    const requestBody = {
        username: userInfo.username,
        password: userInfo.password,
    };

    // 2. 서버에 회원가입 요청을 보냅니다.
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    });

    // 3. 응답이 실패했는지 확인합니다.
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }

    // 4. 성공 응답을 변환하여 UI 컴포넌트로 반환합니다.
    const serverData = await response.json();
    return transformSignUpData(serverData);
};