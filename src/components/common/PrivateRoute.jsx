import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { TaskProvider } from "../../context/TaskContext";
import { NotificationProvider } from "../../context/NotificationContext";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TaskProvider userId={user?.uid}>
      <NotificationProvider userId={user?.uid}>
        <div className="flex h-screen bg-gray-50 dark:bg-dark-bg">
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar onMenuClick={() => setMobileSidebarOpen(true)} />
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </NotificationProvider>
    </TaskProvider>
  );
};

export default PrivateRoute;
