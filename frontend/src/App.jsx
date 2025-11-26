import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/auth/Signup";
import CreateBooking from "./pages/customer/CreateBooking";
import BookingList from "./pages/customer/BookingList";
import AssignedJobs from "./pages/provider/AssignedJobs";
import JobDetails from "./pages/provider/JobDetails";
import UploadProof from "./pages/customer/UploadProof";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* Provider */}
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer/create-booking" element={<CreateBooking />} />
        <Route path="/customer/bookings" element={<BookingList />} />
        <Route path="/provider/jobs" element={<AssignedJobs />} />
        <Route path="/provider/job/:id" element={<JobDetails />} />
        <Route path="/customer/upload/:id" element={<UploadProof />} />
      </Routes>
    </BrowserRouter>
  );
}
