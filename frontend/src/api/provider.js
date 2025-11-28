import api from "./axios";

export const getProviderJobs = (id) =>
  api.get(`/booking/provider/${id}`);

export const updateJobStatus = (id, status) =>
  api.post(`/booking/update-status/${id}?status=${status}`);

