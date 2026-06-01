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
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar />
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
