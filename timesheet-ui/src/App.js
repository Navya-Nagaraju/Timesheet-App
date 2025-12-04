import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeDashboard from "./components/EmployeeDashBoard";
import ManagerDashboard from "./components/ManagerDashBoard";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Employee Dashboard */}
      <Route path="/employee" element={<EmployeeDashboard />} />

      {/* Manager Dashboard */}
      <Route path="/manager" element={<ManagerDashboard />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;
