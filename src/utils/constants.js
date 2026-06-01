// ============================================
// CONSTANTS
// ============================================

export const TASK_TYPES = ['Assignment', 'Quiz', 'Exam', 'Project']

export const PRIORITIES = ['Low', 'Medium', 'High']

export const TASK_STATUSES = ['Pending', 'In Progress', 'Completed']

export const PRIORITY_COLORS = {
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export const PRIORITY_BADGE_COLORS = {
  Low: 'text-green-600 dark:text-green-400',
  Medium: 'text-yellow-600 dark:text-yellow-400',
  High: 'text-red-600 dark:text-red-400',
}

export const STATUS_COLORS = {
  Pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

export const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts repeated day in and day out.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Excellence is not a destination; it is a continuous journey.",
  "Your time is limited, don't waste it living someone else's life.",
  "The expert in anything was once a beginner.",
  "Strive for progress, not perfection.",
  "Great things never came from comfort zones.",
]

export const NOTIFICATION_TYPES = {
  DEADLINE_SOON: 'deadline_soon',
  TASK_OVERDUE: 'task_overdue',
  TASK_COMPLETED: 'task_completed',
  TASK_ASSIGNED: 'task_assigned',
}

export const DATE_FORMAT = 'MMM dd, yyyy'
export const DATE_TIME_FORMAT = 'MMM dd, yyyy HH:mm'
