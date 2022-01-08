import apiClient from "../index";

const SchedulesUrl = "/admin/Schedules";

const getSchedules = (
  pageNumber = 0,
  pageSize = 10,
  companyName = undefined,
  customerName = undefined,
) =>
  apiClient
    .get(SchedulesUrl, {
      params: {
        pageSize,
        pageNumber,
        companyName,
        customerName

      },
    })
    .then((response) => response.data);




const postSchedule = (data) =>
  apiClient
    .post(SchedulesUrl, data)
    .then((response) => response.data);

const putSchedule = (id, data) =>
  apiClient
    .put(`${SchedulesUrl}/${id}`, data)
    .then((response) => response.data);

const deleteSchedule = (ids) =>
  apiClient.delete(SchedulesUrl, { data: ids }).then((response) => response.data);

export {
  getSchedules,
  postSchedule,
  putSchedule,
  deleteSchedule,
};
