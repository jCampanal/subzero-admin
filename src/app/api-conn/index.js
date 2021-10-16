import store from '../store';
import {login} from '../store/auth/authorizationSlice';

const {default: axios} = require('axios');

const apiClient = axios.create({
    baseURL: 'https://31.220.21.190:5000/api',
});

apiClient.interceptors.request.use(
    (config) => {
        config.headers = {
            Authorization: `Bearer ${store.getState().login.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return config;
    },
    (error) => Promise.reject(error)
);

const refreshTokenUrl = '/User/refresh-token';
const postRefreshToken = (token) => apiClient.post(refreshTokenUrl, token).then((response) => response.data.data);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const payload = {
                refreshToken: store.getState().login.refreshToken,
            };
            const {token, tokenRefresh} = await postRefreshToken(JSON.stringify(payload));
            store.dispatch(login({token, refreshToken: tokenRefresh}));
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
