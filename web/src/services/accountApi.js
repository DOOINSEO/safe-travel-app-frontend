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
  const {body} = serverData;
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
  const serverData = await apiClient.get(`/user/${userId}`);
  return transformUserProfile(serverData);
};

/**
 * 사용자 프로필 정보를 업데이트합니다.
 * @param {string} userId - 수정할 사용자의 ID
 * @param {object} dataToUpdate - 수정할 데이터 객체
 */
export const updateUserProfile = async (userId, dataToUpdate) => {
  // TODO: 실제 수정 API의 엔드포인트와 HTTP Method(PUT, PATCH 등)를 백엔드에 확인해야 합니다.
  return await apiClient.put(`/user/${userId}`, dataToUpdate);
}; // ❗️ 수정 2: 여기에 빠져있던 닫는 중괄호를 추가했습니다.

export const getUserAccountData = async () => {
  // TODO: 실제 API 엔드포인트 '/account/my-info'가 맞는지 확인하세요.
  return await apiClient.get('/account/my-info');
};

export const addContact = async (newContact) => {
  // TODO: 실제 API 엔드포인트와 요청 본문 형식을 확인하세요.
  await apiClient.post('/account/contacts', {contact: newContact});
};

export const deleteContact = async (contactToRemove) => {
  // TODO: 실제 API 엔드포인트와 요청 본문 형식을 확인하세요.
  await apiClient.delete('/account/contacts', {contact: contactToRemove});
};

export const saveEmergencyMessage = async (message) => {
  // TODO: 실제 API 엔드포인트와 요청 본문 형식을 확인하세요.
  await apiClient.put('/account/emergency-message', {message});
};
