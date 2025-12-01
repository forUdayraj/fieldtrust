import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CreateBooking from "./pages/customer/CreateBooking";
import BookingList from "./pages/customer/BookingList";
import UploadProof from "./pages/customer/UploadProof";

import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AssignedJobs from "./pages/provider/AssignedJobs";
import JobDetails from "./pages/provider/JobDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/auth/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* CUSTOMER */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/create-booking"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CreateBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute role="CUSTOMER">
              <BookingList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/upload/:id"
          element={
            <ProtectedRoute role="CUSTOMER">
              <UploadProof />
            </ProtectedRoute>
          }
        />

        {/* PROVIDER */}
        <Route
          path="/provider/dashboard"
          element={
            <ProtectedRoute role="PROVIDER">
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ FINAL: NO PARAM HERE */}
        <Route
          path="/provider/jobs"
          element={
            <ProtectedRoute role="PROVIDER">
              <AssignedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/job/:id"
          element={
            <ProtectedRoute role="PROVIDER">
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/job"
          element={
            <ProtectedRoute role="PROVIDER">
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
