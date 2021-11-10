import apiClient from '../index';

const blacklistURL = '/admin/Blacklist';

const getBlacklisted = (pageNumber = 0, pageSize = 10) => apiClient.get(blacklistURL, {params: {pageNumber, pageSize}}).then((response) => response.data);

const getAllBlacklisted = () => apiClient.get(`${blacklistURL}/getAll`).then((response) => response.data);

const postBlacklisted = (data) => apiClient.post(blacklistURL, data).then((response) => response.data);

const deleteBlacklisted = (id) => apiClient.delete(`${blacklistURL}/${id}`).then((response) => response.data);

export {getBlacklisted, getAllBlacklisted, postBlacklisted, deleteBlacklisted};
