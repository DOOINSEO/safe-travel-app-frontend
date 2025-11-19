// 비상 연락망 데이터를 로컬 스토리지에 저장/불러오기하는 유틸리티
// 앱 재실행 후에도 데이터가 유지되도록 localStorage 사용

const STORAGE_KEY = 'emergency_contact';

export const saveEmergencyData = (phone, message) => {
  try {
    const data = {
      phone: phone || '',
      message: message || '',
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return {success: true};
  } catch (error) {
    console.error('비상 연락망 저장 실패:', error);
    return {success: false, error: error.message};
  }
};

export const loadEmergencyData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return null;
    }
    const parsed = JSON.parse(data);
    return {
      phone: parsed.phone || '',
      message: parsed.message || '',
    };
  } catch (error) {
    console.error('비상 연락망 불러오기 실패:', error);
    return null;
  }
};

export const clearEmergencyData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return {success: true};
  } catch (error) {
    console.error('비상 연락망 삭제 실패:', error);
    return {success: false, error: error.message};
  }
};

export const hasEmergencyData = () => {
  const data = loadEmergencyData();
  return data && (data.phone || data.message);
};
