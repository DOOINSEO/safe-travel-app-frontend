import apiClient from './apiClient'; // { apiClient } -> apiClient 로 변경 (default export)

export const login = async (loginId, password) => {
    // 이제 response는 data, headers, status 등을 포함한 전체 객체입니다.
    const response = await apiClient.post('/api/user/login', { loginId, password });

    // 헤더에서 Authorization 토큰을 확인합니다.
    const authHeader = response.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // "Bearer " 접두사를 제거하고 실제 토큰만 추출합니다.
        const accessToken = authHeader.substring(7);

        // 토큰을 localStorage에 저장합니다.
        localStorage.setItem('token', accessToken);

        return {
            success: true,
            message: 'Login Success'
        };
    } else {
        // 헤더에 토큰이 없는 비정상적인 경우
        throw new Error("로그인에 실패했습니다: 인증 토큰을 받지 못했습니다.");
    }
};

export const signup = async (signupData) => {
    // apiClient가 이제 전체 응답을 반환하므로, .data를 명시적으로 사용해야 합니다.
    const response = await apiClient.post('/api/user', signupData);
    return response.data; // 실제 데이터는 response.data 안에 있습니다.
};