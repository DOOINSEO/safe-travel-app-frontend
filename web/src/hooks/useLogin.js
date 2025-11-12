import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authApi';

/**
 * 로그인 비즈니스 로직을 처리하는 커스텀 훅입니다.
 * API 호출, 로딩 및 에러 상태 관리를 캡슐화합니다.
 */
export function useLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * 주어진 아이디와 비밀번호로 로그인을 시도합니다.
     * @param {string} loginId - 사용자 아이디
     * @param {string} password - 사용자 비밀번호
     */
    const loginUser = async (loginId, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const userData = await login(loginId, password);
            console.log('로그인 성공! 사용자 정보:', userData);
            navigate('/'); // 성공 시 메인 페이지로 이동
        } catch (err) {
            setError(err.message);
            console.error('로그인 실패:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return { loginUser, isLoading, error };
}