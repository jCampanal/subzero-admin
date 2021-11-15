import apiClient from '../index';

const providerUrl = '/admin/Provider';

const getProvidersAll = () => apiClient.get(`${providerUrl}/getAll`).then((response) => response.data);

const getProviders = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${providerUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);

const getProvider = (id) => apiClient.get(`${providerUrl}/${id}`).then((response) => response.data);

const postProviders = (data) => apiClient.post(providerUrl, data).then((response) => response.data);

const putProviders = (id, data) => apiClient.put(`${providerUrl}/${id}`, data).then((response) => response.data);

const deleteProviders = (id) => apiClient.delete(`${providerUrl}/${id}`).then((response) => response.data);

export {getProvidersAll, getProviders, getProvider, postProviders, putProviders, deleteProviders};
