import apiClient from '../index';

const coolersUrl = '/admin/Coolers';

export const getCoolers = (pageNumber = 0, pageSize = 10) =>
    apiClient.get(`${coolersUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`).then((response) => response.data);

export const postCooler = (data) => apiClient.post(coolersUrl, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response.data);

export const putCooler = (id, data) =>
    apiClient.put(`${coolersUrl}/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response.data);

export const deleteCooler = (id) => apiClient.delete(`${coolersUrl}/${id}`).then((response) => response.data);
