const normalizePhoneNumber = (phone) => {
  if (!phone) return null;

  // 숫자만 추출
  const digits = phone.replace(/[^0-9]/g, '');

  // 한국 전화번호 형식 검증 (010, 011, 016, 017, 018, 019로 시작, 10-11자리)
  if (digits.length >= 10 && digits.length <= 11) {
    if (
      digits.startsWith('010') ||
      digits.startsWith('011') ||
      digits.startsWith('016') ||
      digits.startsWith('017') ||
      digits.startsWith('018') ||
      digits.startsWith('019')
    ) {
      return digits;
    }
  }

  return null;
};

// 비상 메시지 앱 열기
export const sendEmergencySMS = async () => {
  try {
    const {loadEmergencyData} = await import('./emergencyStorage');
    const data = loadEmergencyData();

    if (!data) {
      return {success: false, error: '저장된 비상 연락망이 없습니다. 내 정보 페이지에서 설정해주세요.'};
    }

    const {phone, message} = data;

    if (!phone || phone.trim().length === 0) {
      return {success: false, error: '저장된 전화번호가 없습니다. 내 정보 페이지에서 전화번호를 입력해주세요.'};
    }

    if (!message || message.trim().length === 0) {
      return {success: false, error: '저장된 메시지가 없습니다. 내 정보 페이지에서 메시지를 입력해주세요.'};
    }

    // 전화번호 유효성 검사 및 정규화
    const normalizedPhone = normalizePhoneNumber(phone);
    if (!normalizedPhone) {
      return {success: false, error: '유효한 전화번호가 없습니다. 전화번호를 확인해주세요.'};
    }

    if (typeof window === 'undefined') {
      return {success: false, error: '브라우저 환경이 아닙니다.'};
    }

    const encodedMessage = encodeURIComponent(message);
    const smsUri = `sms:${normalizedPhone}?body=${encodedMessage}`;

    console.log('메시지 앱 열기 시도:', {phone: normalizedPhone, messageLength: message.length, uri: smsUri});

    // 안드로이드 Morpheus 하이브리드 앱에서 메시지 앱 열기
    // window.location.href를 사용하여 SMS URI로 메시지 앱 열기
    try {
      window.location.href = smsUri;
      return {success: true};
    } catch (locationError) {
      console.error('메시지 앱 열기 오류:', locationError);
      return {success: false, error: '메시지 앱을 열 수 없습니다.'};
    }
  } catch (error) {
    console.error('비상 메시지 앱 열기 실패:', error);
    return {success: false, error: error.message || '메시지 앱을 열 수 없습니다.'};
  }
};
