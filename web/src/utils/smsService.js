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
    // 비상 연락망 데이터 조회
    const {getEmergency, getUserProfile} = await import('../services/accountApi');
    const emergencyResponse = await getEmergency();
    const emergencyData = emergencyResponse?.data || emergencyResponse;

    if (!emergencyData || !emergencyData.phone) {
      return {success: false, error: '저장된 비상 연락망이 없습니다. 내 정보 페이지에서 설정해주세요.'};
    }

    const {phone, message: userMessage} = emergencyData;

    if (!phone || phone.trim().length === 0) {
      return {success: false, error: '저장된 전화번호가 없습니다. 내 정보 페이지에서 전화번호를 입력해주세요.'};
    }

    // 전화번호 유효성 검사 및 정규화
    const normalizedPhone = normalizePhoneNumber(phone);
    if (!normalizedPhone) {
      return {success: false, error: '유효한 전화번호가 없습니다. 전화번호를 확인해주세요.'};
    }

    if (typeof window === 'undefined') {
      return {success: false, error: '브라우저 환경이 아닙니다.'};
    }

    // 사용자 이름 가져오기
    let userName = '';
    try {
      const userResponse = await getUserProfile();
      const userData = userResponse?.data || userResponse;
      userName = userData?.name || '';
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }

    // 디폴트 메시지 생성
    const defaultMessage = `현재 "${userName || '사용자'}"님이 위험 상황으로 판단되어, 앱의 원클릭 긴급전송 기능을 통해 자동으로 발송된 메시지입니다. [11.5623°N, 104.9210°E]`;

    // 최종 메시지 구성
    const finalMessage = userMessage && userMessage.trim().length > 0 
      ? `${defaultMessage}\n\n${userMessage}`
      : defaultMessage;

    const encodedMessage = encodeURIComponent(finalMessage);
    const smsUri = `sms:${normalizedPhone}?body=${encodedMessage}`;

    console.log('메시지 앱 열기 시도:', {phone: normalizedPhone, messageLength: finalMessage.length, uri: smsUri});

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
