import axios from 'axios';
import { API_URL, CONTENT_TYPE_JSON } from '../constants/constants.jsx';

// 토큰 갱신 함수
const tokenRefresh = async () => {
    try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
            const response = await axios.post(`${API_URL}/token/refresh`, {
                refreshToken,
            });
            const newAccessToken = response.data.accessToken;
            sessionStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        }
        return null;
    } catch (error) {
        console.error('토큰 교체 실패:', error);
        throw error;
    }
};

// 일반 API 클라이언트
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': CONTENT_TYPE_JSON,
    },
});

// 인증이 필요한 API 클라이언트
const authApiClient = token => {
    const instance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': CONTENT_TYPE_JSON,
            Authorization: `${token}`,
        },
    });

    // 요청 인터셉터
    instance.interceptors.request.use(async config => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            };
        }
        return config;
    });

    // 응답 인터셉터
    instance.interceptors.response.use(undefined, async error => {
        if (error.response && error.response.status === 403) {
            try {
                const newAccessToken = await tokenRefresh();
                const updatedConfig = {
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                };
                const response = await axios.request(updatedConfig);
                return response;
            } catch (refreshError) {
                console.error('토큰 만료 및 교체 실패', refreshError);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    });

    return instance;
};

export default { apiClient, authApiClient };
