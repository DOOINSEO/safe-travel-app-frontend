/**
 * @file 모든 API 요청을 처리하는 중앙 클라이언트입니다.
 */
const API_BASE_URL = '/api';

async function request(endpoint, options = {}) {
    const { body, ...customOptions } = options;
    const headers = {
        'Content-Type': 'application/json',
        ...customOptions.headers,
    };
    const config = {
        method: body ? 'POST' : 'GET',
        ...customOptions,
        headers,
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API 요청에 실패했습니다.');
    }
    try {
        return await response.json();
    } catch {
        return null;
    }
}

export const apiClient = {
    get: (endpoint) => request(endpoint),
    post: (endpoint, body) => request(endpoint, { body }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};