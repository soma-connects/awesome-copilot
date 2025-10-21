import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NewsPage from "./pages/NewsPage";
import AdminDashboardPage from "./pages/dashboards/AdminDashboardPage";
import NewsManagementPage from "./pages/dashboards/NewsManagementPage";
import ServiceRequestsPage from "./pages/dashboards/ServiceRequestsPage";
import StaffDashboardPage from "./pages/dashboards/StaffDashboardPage";
import HomePage from "./pages/HomePage";
import { Role } from "./types";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route element={<ProtectedRoute roles={[Role.ADMIN, Role.STAFF]} />}>
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/news" element={<NewsManagementPage />} />
          <Route path="admin/requests" element={<ServiceRequestsPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={[Role.STAFF]} />}>
          <Route path="staff" element={<StaffDashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
