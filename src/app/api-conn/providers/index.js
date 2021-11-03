import apiClient from '../index';

const providerUrl = '/admin/Provider';

export const getProvidersAll = () => apiClient.get(`${providerUrl}/getAll`).then((response) => response.data);
