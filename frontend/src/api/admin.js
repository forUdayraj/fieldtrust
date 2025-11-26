import api from "./axios";

export const fetchAllBookings = () => api.get("/admin/bookings");
export const fetchAuditForBooking = (id) => api.get(`/admin/audit/${id}`);
export const verifyBooking = (id, adminName, action) =>
  api.post(`/admin/verify/${id}?admin=${encodeURIComponent(adminName)}&action=${action}`);
