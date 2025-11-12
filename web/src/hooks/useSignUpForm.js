import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../services/authApi';

/**
 * 회원가입 폼의 상태 관리와 제출 로직을 처리하는 커스텀 훅입니다.
 */
export function useSignUpForm() {
  const navigate = useNavigate();

  // 모든 폼 필드를 하나의 상태 객체로 관리합니다.
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    nickname: '',
    alarmEnabled: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 모든 input의 변경 이벤트를 처리하는 범용 핸들러입니다.
   * input의 'name' 속성을 키로 사용하여 상태를 업데이트합니다.
   */
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    let processedValue = type === 'checkbox' ? checked : value;

    // 필드별 특수 처리
    if (name === 'loginId') {
      processedValue = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    }
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length > 11) return; // 11자리 초과 입력 방지
      processedValue = numericValue;
    }

    setFormData((prev) => ({...prev, [name]: processedValue}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const {confirmPassword, ...signupPayload} = formData;
      await signup(signupPayload);
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
      console.error('회원가입 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {formData, handleChange, handleSubmit, isLoading, error};
}
