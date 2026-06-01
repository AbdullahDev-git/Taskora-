import React from "react";
import { Bell, X } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
  const { unreadCount, notifications } = useNotifications();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg3 transition-colors text-gray-700 dark:text-dark-text2 hover:text-gray-900 dark:hover:text-dark-text"
        title="Notifications"
      >
        <Bell size={20} />

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default NotificationBell;
