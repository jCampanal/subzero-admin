import apiClient from "../index";

const providerUrl = "/admin/Provider";

const getProvidersAll = () =>
  apiClient.get(`${providerUrl}/getAll`).then((response) => response.data);

const getProviders = (pageNumber = 0, pageSize = 10, name) =>
  apiClient
    .get(providerUrl, { params: { pageNumber, pageSize, name } })
    .then((response) => response.data);

const getProvider = (id) =>
  apiClient.get(`${providerUrl}/${id}`).then((response) => response.data);

const postProviders = (data) =>
  apiClient.post(providerUrl, data).then((response) => response.data);

const putProviders = (id, data) =>
  apiClient.put(`${providerUrl}/${id}`, data).then((response) => response.data);

const deleteProviders = (ids) =>
  apiClient
    .delete(`${providerUrl}`, { data: ids })
    .then((response) => response.data);

export {
  getProvidersAll,
  getProviders,
  getProvider,
  postProviders,
  putProviders,
  deleteProviders,
};
