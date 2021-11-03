import apiClient from '../index';

const providerUrl = '/admin/Provider';

export const getProvidersAll = () => apiClient.get(`${providerUrl}/getAll`).then((response) => response.data);

export const getProviders = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${providerUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);
