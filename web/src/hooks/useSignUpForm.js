import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signup} from '../services/authApi';
import {formatPhoneNumber} from '../utils/formatter';

export function useSignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    nickname: '',
    alarmEnabled: true,
  });
  const [error, setError] = useState('');

  // 전화번호 정규화: 숫자만 남기고 하이픈 제거
  const normalizePhone = (phone) => {
    return phone.replace(/[^0-9]/g, '');
  };

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    let processedValue = type === 'checkbox' ? checked : value;
    
    // 전화번호 필드는 숫자만 저장 (UI에는 하이픈이 보이도록 포맷팅)
    if (name === 'phone') {
      processedValue = normalizePhone(value);
    }
    
    setFormData((prev) => ({...prev, [name]: processedValue}));
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 비밀번호 일치 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 전화번호 정규화하여 전송
    const {confirmPassword, ...signupPayload} = formData;
    signupPayload.phone = normalizePhone(signupPayload.phone);
    
    try {
      await signup(signupPayload);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  // UI에 표시할 전화번호 (하이픈 포함)
  const displayPhone = formatPhoneNumber(formData.phone);

  return {formData, handleChange, handleSubmit, error, displayPhone};
}
