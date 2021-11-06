import apiClient from '../index';

const emailsURL = '/admin/Email';

const getEmails = (pageNumber = 0, pageSize = 10) => apiClient.get(emailsURL, {params: {pageSize, pageNumber}}).then((response) => response.data);

const getAllEmails = () => apiClient.get(`${emailsURL}/getAll`).then((response) => response.data);

const getEmailById = (id) => apiClient.get(`${emailsURL}/${id}`).then((response) => response.data);

const postEmail = (data) => apiClient.post(emailsURL, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => response.data);

export {getEmails, getAllEmails, getEmailById, postEmail};
