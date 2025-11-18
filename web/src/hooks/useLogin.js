import {useNavigate} from 'react-router-dom';
import {login} from '../services/authApi';
import useAuthStore from '../stores/authStore';

export function useLogin() {
  const navigate = useNavigate();
  const {setToken, setUserId} = useAuthStore();

  const loginUser = async (loginId, password) => {
    try {
      const response = await login(loginId, password);

      // 헤더에서 Authorization 토큰 추출
      const authHeader = response.headers?.authorization || response.headers?.Authorization;
      let token = null;

      if (authHeader) {
        // "Bearer {token}" 형식에서 토큰 추출
        token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
      }

      // 응답 데이터에서 사용자 ID 추출 (응답 구조: {message, data: {id, ...}, isSuccess})
      const userId = response.data?.data?.id;

      // 기존 토큰과 사용자 ID를 새 것으로 교체
      if (token) {
        setToken(token);
      }

      if (userId) {
        setUserId(userId);
      }

      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return {loginUser};
}
