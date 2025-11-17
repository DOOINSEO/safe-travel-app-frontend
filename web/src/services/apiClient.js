import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 모든 API 요청을 보내기 전에 이 부분이 실행됩니다.
// 로컬 스토리지에 토큰이 있으면, HTTP 헤더에 'Authorization'을 추가합니다.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 모든 API 응답을 받은 후에 이 부분이 실행됩니다.
apiClient.interceptors.response.use(
    /**
     * 성공적인 응답 처리:
     * 기존에는 'response.data'만 반환했지만, 헤더 정보(토큰)에 접근하기 위해
     * 'response' 객체 전체를 반환하도록 수정했습니다.
     */
    (response) => response,

    /**
     * 에러 응답 처리:
     * 401 Unauthorized 에러가 발생하면 토큰을 삭제하고 로그인 페이지로 리디렉션합니다.
     */
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // localStorage.removeItem('userInfo'); // 사용자 정보도 저장했다면 함께 삭제
            window.location.href = '/login';
        }
        // 다른 컴포넌트에서 에러를 처리할 수 있도록 에러를 다시 던져줍니다.
        return Promise.reject(error.response?.data ?? error);
    }
);

export default apiClient;