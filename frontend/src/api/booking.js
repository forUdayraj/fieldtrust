// src/api/booking.js

import api from "./axios";

export const createBooking = (data) => api.post("/booking/create", data);
export const getCustomerBookings = (id) => api.get(`/booking/customer/${id}`);
export const getBookingById = (id) => api.get(`/booking/${id}`);
