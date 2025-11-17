import {useNavigate} from 'react-router-dom';
import {login} from '../services/authApi';

export function useLogin() {
  const navigate = useNavigate();

  const loginUser = async (loginId, password) => {
    try {
      await login(loginId, password);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return {loginUser};
}
