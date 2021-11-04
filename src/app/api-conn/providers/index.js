import apiClient from '../index';

const providerUrl = '/admin/Provider';

export const getProvidersAll = () => apiClient.get(`${providerUrl}/getAll`).then((response) => response.data);

export const getProviders = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${providerUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);

export const postProviders = (data) => apiClient.post(providerUrl, data).then((response) => response.data);

export const putProviders = (id, data) => apiClient.put(`${providerUrl}/${id}`, data).then((response) => response.data);

export const deleteProviders = (id) => apiClient.delete(`${providerUrl}/${id}`).then((response) => response.data);
