import React from "react";
import { X, Trash2, CheckCircle2 } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import { formatDate } from "../../utils/helpers";

const NotificationDropdown = ({ onClose }) => {
  const { notifications, unreadCount, markAllAsRead, deleteNotification } =
    useNotifications();

  return (
    <div className="absolute top-12 right-0 w-96 bg-white dark:bg-dark-bg2 rounded-xl border border-gray-200 dark:border-dark-border shadow-lg z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-dark-text">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <p className="text-xs text-gray-500 dark:text-dark-text2">
              {unreadCount} unread
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-dark-bg3 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-dark-text2 text-sm">
              No notifications yet
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 border-b border-gray-100 dark:border-dark-bg3 hover:bg-gray-50 dark:hover:bg-dark-bg3 transition-colors flex items-start gap-3 ${
                !notif.isRead
                  ? "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20"
                  : ""
              }`}
            >
              {/* Unread indicator */}
              {!notif.isRead && (
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-dark-text">
                  {notif.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-text2 mt-1">
                  {notif.timestamp
                    ? formatDate(notif.timestamp, "MMM dd, HH:mm")
                    : "Just now"}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteNotification(notif.id)}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded transition-colors flex-shrink-0"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 dark:border-dark-border">
          <button
            onClick={markAllAsRead}
            className="w-full text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 py-2 transition-colors"
          >
            <CheckCircle2 size={16} className="inline mr-2" />
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
