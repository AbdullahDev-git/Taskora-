import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Common Components
import PrivateRoute from "./components/common/PrivateRoute";
import Loader from "./components/common/Loader";

// Auth Pages
import Welcome from "./pages/auth/Welcome";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Main Pages
import Dashboard from "./pages/Dashboard";
import ProfileSettings from "./pages/ProfileSettings";

// Task Pages
import TaskList from "./pages/tasks/TaskList";
import AddEditTask from "./pages/tasks/AddEditTask";
import TaskDetail from "./pages/tasks/TaskDetail";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* ============================================ */}
            {/* PUBLIC ROUTES (No Sidebar/TopBar) */}
            {/* ============================================ */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ============================================ */}
            {/* AUTHENTICATED ROUTES (With Sidebar/TopBar) */}
            {/* ============================================ */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/add" element={<AddEditTask />} />
              <Route path="/tasks/edit/:id" element={<AddEditTask />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/profile" element={<ProfileSettings />} />
            </Route>

            {/* ============================================ */}
            {/* CATCH-ALL REDIRECT */}
            {/* ============================================ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "8px",
                background: "#1e293b",
                color: "#f1f5f9",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#16a34a",
                },
                iconTheme: {
                  primary: "#f1f5f9",
                  secondary: "#16a34a",
                },
              },
              error: {
                style: {
                  background: "#dc2626",
                },
                iconTheme: {
                  primary: "#f1f5f9",
                  secondary: "#dc2626",
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
