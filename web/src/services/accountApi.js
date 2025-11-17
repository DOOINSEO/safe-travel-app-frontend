import apiClient from './apiClient';

/**
 * 서버의 사용자 프로필 응답을 클라이언트에서 변환합니다.
 * 명세서에 따라, 실제 데이터는 'body' 객체 안에 있습니다.
 * @param {object} serverData - 서버 응답 원본
 */
const transformUserProfile = (serverData) => {
    if (!serverData || !serverData.body) {
        return null;
    }
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

// --- 계정 관리 API 서비스 함수 ---

/**
 * 특정 사용자의 프로필 정보를 가져옵니다.
 * @param {string} userId
 */
export const getUserProfile = async (userId) => {
    // 이제 response는 전체 객체이므로 .data를 사용해야 합니다.
    const response = await apiClient.get(`/api/user/${userId}`);
    return transformUserProfile(response.data);
};

/**
 * 사용자 프로필 정보를 업데이트합니다.
 * @param {string} userId - 수정할 사용자의 ID
 * @param {object} dataToUpdate - 수정할 데이터 객체
 */
export const updateUserProfile = async (userId, dataToUpdate) => {
    const response = await apiClient.put(`/api/user/${userId}`, dataToUpdate);
    return response.data;
};

export const getUserAccountData = async () => {
    const response = await apiClient.get('/api/account/my-info');
    return response.data;
};

export const addContact = async (newContact) => {
    const response = await apiClient.post('/api/account/contacts', { contact: newContact });
    return response.data;
};

export const deleteContact = async (contactToRemove) => {
    const response = await apiClient.delete('/api/account/contacts', { data: { contact: contactToRemove } }); // DELETE 요청 시 본문은 data 속성에 넣습니다.
    return response.data;
};

export const saveEmergencyMessage = async (message) => {
    const response = await apiClient.put('/api/account/emergency-message', { message });
    return response.data;
};