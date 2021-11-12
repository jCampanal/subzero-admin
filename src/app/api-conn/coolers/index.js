import apiClient from '../index';

const coolersUrl = '/admin/Coolers';

const getCoolers = (pageNumber = 0, pageSize = 10, code = '', date = '', returned = undefined) =>
    apiClient.get(coolersUrl, {params: {pageSize, pageNumber, code, date, returned}}).then((response) => response.data);

const postCooler = (data) => apiClient.post(coolersUrl, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response.data);

const putCooler = (id, data) =>
    apiClient.put(`${coolersUrl}/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response.data);

const deleteCooler = (ids) => apiClient.delete(coolersUrl, {data: ids}).then((response) => response.data);

export {getCoolers, postCooler, putCooler, deleteCooler};
