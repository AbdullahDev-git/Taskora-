// ============================================
// HELPER FUNCTIONS
// ============================================

import { differenceInDays, differenceInHours, format } from "date-fns";

/**
 * Format date to readable string
 */
export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  if (!date) return "";
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  return format(d, formatStr);
};

/**
 * Get relative time (e.g., "2 days left")
 */
export const getRelativeTime = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  const days = differenceInDays(d, new Date());

  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days left`;
};

/**
 * Check if deadline is within 24 hours
 */
export const isDeadlineSoon = (date) => {
  if (!date) return false;
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  const hours = differenceInHours(d, new Date());
  return hours > 0 && hours <= 24;
};

/**
 * Check if task is overdue
 */
export const isTaskOverdue = (date) => {
  if (!date) return false;
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  return differenceInDays(d, new Date()) < 0;
};

/**
 * Get random motivational quote
 */
export const getRandomQuote = (quotes) => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password) => {
  return password.length >= 6;
};

/**
 * Capitalize first letter of each word in a name
 */
export const capitalizeName = (name) => {
  if (!name) return "";
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
};

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 50) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};

/**
 * Get color by priority
 */
export const getPriorityColor = (priority) => {
  const colors = {
    Low: "#3b82f6",
    Medium: "#f59e0b",
    High: "#ef4444",
  };
  return colors[priority] || "#6b7280";
};

/**
 * Sort tasks by deadline
 */
export const sortTasksByDeadline = (tasks, order = "asc") => {
  return [...tasks].sort((a, b) => {
    const dateA =
      a.deadline instanceof Date
        ? a.deadline
        : a.deadline?.toDate?.() || new Date(a.deadline);
    const dateB =
      b.deadline instanceof Date
        ? b.deadline
        : b.deadline?.toDate?.() || new Date(b.deadline);
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Filter tasks by multiple criteria
 */
export const filterTasks = (tasks, filters) => {
  return tasks.filter((task) => {
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.subject && task.subject !== filters.subject) {
      return false;
    }
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }
    if (filters.status && task.status !== filters.status) {
      return false;
    }
    return true;
  });
};

/**
 * Get task statistics
 */
export const getTaskStats = (tasks) => {
  const stats = {
    total: tasks.length,
    pending: 0,
    completed: 0,
    upcoming: 0,
  };

  tasks.forEach((task) => {
    if (task.status === "Completed") {
      stats.completed++;
    } else if (task.status === "Pending") {
      stats.pending++;
    }

    // Check if upcoming (within 7 days)
    if (task.status !== "Completed") {
      const d =
        task.deadline instanceof Date
          ? task.deadline
          : task.deadline?.toDate?.() || new Date(task.deadline);
      const daysUntil = differenceInDays(d, new Date());
      if (daysUntil >= 0 && daysUntil <= 7) {
        stats.upcoming++;
      }
    }
  });

  return stats;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
