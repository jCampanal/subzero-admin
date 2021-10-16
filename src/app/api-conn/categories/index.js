import apiClient from '../index';

const categoryBase = '/admin/Category';

export const getCategories = (pageSize = 10, pageNumber = 1) =>
    apiClient.get(`${categoryBase}?pageSize=${pageSize}&pageNumber=${pageNumber}`).then((response) => response.data);
