import { Routes, Route, Navigate } from "react-router-dom";
import CreateSoftware from "./pages/CreateSoftware";
import RequestAccess from "./pages/RequestAccess";
import PendingRequests from "./pages/PendingRequests";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/create-software"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateSoftware />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-access"
          element={
            <ProtectedRoute allowedRoles={["employee", "admin"]}>
              <RequestAccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending-requests"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <PendingRequests />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
