import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { capitalizeName } from "../../utils/helpers";

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { logout, userProfile } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path) => location.pathname === path;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-dark-border flex-shrink-0">
        <Link to="/dashboard" className="flex items-center justify-center group" onClick={onMobileClose}>
          <div className="p-2 rounded-lg bg-primary-600 text-white group-hover:bg-primary-700 transition-colors flex-shrink-0">
            <GraduationCap size={22} />
          </div>
          {!collapsed && (
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-dark-text">
              Taskora
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            onClick={onMobileClose}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all ${isActive(path)
                ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400"
                : "text-gray-700 dark:text-dark-text2 hover:bg-gray-100 dark:hover:bg-dark-bg3"
            }`}
            title={collapsed ? label : undefined}
          >
            <Icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-dark-border py-3 space-y-1 px-2 flex-shrink-0">
        {!collapsed && userProfile?.name && (
          <div className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-dark-bg3 mx-1 mb-1">
            <p className="text-xs text-gray-500 dark:text-dark-text2 mb-0.5">
              Logged in as
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-dark-text truncate">
              {capitalizeName(userProfile.name)}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 dark:text-dark-text2 hover:bg-gray-100 dark:hover:bg-dark-bg3 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {collapsed && (
            <button
              onClick={logout}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 font-medium transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar: overlay with slide */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-30 bg-white dark:bg-dark-bg2 border-r border-gray-200 dark:border-dark-border transition-all duration-300 flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "w-16" : "w-64"}`}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar: always visible */}
      <div
        className={`hidden lg:flex bg-white dark:bg-dark-bg2 border-r border-gray-200 dark:border-dark-border flex-col transition-all duration-300 flex-shrink-0 ${collapsed ? "w-16" : "w-64"}`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
