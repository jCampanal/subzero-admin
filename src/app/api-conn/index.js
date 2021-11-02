import store from '../store';
import {logoutUser} from '../store/user/userSlice';
import {login} from '../store/auth/authorizationSlice';

const {default: axios} = require('axios');

const apiClient = axios.create({
    baseURL: 'https://31.220.21.190:5000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        config.headers.authorization = `Bearer ${store.getState().authorization.token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const refreshTokenUrl = '/User/refreshToken';
const postRefreshToken = (token) =>
    apiClient
        .post(refreshTokenUrl, token)
        .then((response) => response.data.data)
        .catch(() => ({invalid: true}));

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest.isRetrying) {
            originalRequest.isRetrying = true;
            const payload = {
                refreshToken: store.getState().authorization.refreshToken,
            };
            const {token, tokenRefresh, invalid} = await postRefreshToken(JSON.stringify(payload));
            if (!invalid) {
                store.dispatch(login({token, refreshToken: tokenRefresh}));
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            } else {
                store.dispatch(logoutUser());
            }
            return apiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
