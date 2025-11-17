import { useState } from 'react';
import { login } from '../services/authApi';

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (loginId, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await login(loginId, password);

            if (result.success) {
                console.log('로그인 성공!');
                // 성공 시 true를 반환하여 컴포넌트가 후속 조치를 할 수 있도록 합니다.
                return true;
            }
        } catch (err) {
            setError(err.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
            console.error('로그인 실패:', err);
            // 실패 시 false를 반환합니다.
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { loginUser, isLoading, error };
}