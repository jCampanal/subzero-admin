import apiClient from '..';

const loginUrl = '/User/login';

export const postLogin = (credentials) => apiClient.post(loginUrl, credentials).then((response) => response.data);
