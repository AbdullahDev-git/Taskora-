import React, { useState, useRef, useEffect } from "react";
import { Settings, LogOut, ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getInitials, capitalizeName } from "../../utils/helpers";
import ThemeToggle from "../common/ThemeToggle";
import NotificationBell from "../notifications/NotificationBell";

const TopBar = ({ onMenuClick }) => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <div className="h-16 bg-white dark:bg-dark-bg2 border-b border-gray-200 dark:border-dark-border px-4 lg:px-6 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-dark-text2 hover:bg-gray-100 dark:hover:bg-dark-bg3 transition-colors"
        title="Open menu"
      >
        <Menu size={22} />
      </button>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <NotificationBell />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg3 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
              {getInitials(userProfile?.name || "U")}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-dark-text hidden sm:block">
              {capitalizeName(userProfile?.name) || "User"}
            </span>
            <ChevronDown size={16} className="text-gray-400 dark:text-dark-text2" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-bg2 border border-gray-200 dark:border-dark-border rounded-xl shadow-lg py-1 z-50">
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-bg3 transition-colors"
              >
                <Settings size={16} />
                Profile
              </Link>
              <hr className="border-gray-200 dark:border-dark-border" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-colors"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
