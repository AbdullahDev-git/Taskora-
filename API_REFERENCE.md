# 📖 Taskora - API & Feature Reference

## Context API Reference

### 🔐 AuthContext

```javascript
import { useAuth } from "../hooks/useAuth";

const MyComponent = () => {
  const {
    user, // Firebase user object
    userProfile, // User profile from Firestore
    loading, // Loading state
    error, // Error message
    isAuthenticated, // Boolean
    signup, // async (email, password, fullName)
    login, // async (email, password)
    logout, // async ()
    forgotPassword, // async (email)
    updateProfile, // async (updates)
  } = useAuth();
};
```

**Example Usage:**

```javascript
// Signup
await signup("user@example.com", "password123", "John Doe");

// Login
await login("user@example.com", "password123");

// Update Profile
await updateProfile({ name: "Jane Doe", bio: "I love learning" });

// Logout
await logout();
```

---

### 📝 TaskContext

```javascript
import { useTasks } from "../hooks/useTasks";

const MyComponent = () => {
  const {
    tasks, // Array of all tasks
    loading, // Loading state
    error, // Error message
    fetchTasks, // async () - refresh tasks
    createTask, // async (taskData)
    updateTask, // async (taskId, updates)
    deleteTask, // async (taskId)
    toggleTaskStatus, // async (taskId, currentStatus)
    getTaskById, // (taskId) - sync function
  } = useTasks();
};
```

**Task Data Structure:**

```javascript
{
  id: "string",
  userId: "string",
  title: "string",
  type: "Assignment|Quiz|Exam|Project",
  subject: "string",
  deadline: Date,
  priority: "Low|Medium|High",
  status: "Pending|In Progress|Completed",
  description: "string",
  createdAt: Date
}
```

**Example Usage:**

```javascript
// Create task
const newTask = await createTask({
  title: "Final Exam",
  type: "Exam",
  subject: "Mathematics",
  deadline: "2026-05-25",
  priority: "High",
  description: "Cumulative final exam",
});

// Update task
await updateTask(taskId, {
  status: "In Progress",
  description: "Started studying",
});

// Toggle status
await toggleTaskStatus(taskId, "Pending");

// Get single task
const task = getTaskById(taskId);

// Delete task
await deleteTask(taskId);
```

---

### 🔔 NotificationContext

```javascript
import { useNotifications } from "../hooks/useNotifications";

const MyComponent = () => {
  const {
    notifications, // Array of notifications
    unreadCount, // Number of unread
    loading, // Loading state
    fetchNotifications, // async () - refresh
    addNotification, // async (message, type)
    markAsRead, // async (notificationId)
    markAllAsRead, // async ()
    deleteNotification, // async (notificationId)
  } = useNotifications();
};
```

**Example Usage:**

```javascript
// Add notification
await addNotification("Your task is due tomorrow!", "deadline");

// Mark as read
await markAsRead(notificationId);

// Mark all as read
await markAllAsRead();

// Delete notification
await deleteNotification(notificationId);
```

---

### 🌓 ThemeContext

```javascript
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const MyComponent = () => {
  const {
    isDark, // Boolean
    toggleTheme, // Function
    mounted, // Boolean (for hydration)
  } = useContext(ThemeContext);
};
```

**Example Usage:**

```javascript
// Toggle theme
<button onClick={toggleTheme}>
  {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
</button>
```

---

## 🛠️ Utility Functions Reference

### Helper Functions (`src/utils/helpers.js`)

```javascript
import {
  formatDate, // (date, formatStr?) -> string
  getRelativeTime, // (date) -> string (e.g., "2 days left")
  isDeadlineSoon, // (date) -> boolean
  isTaskOverdue, // (date) -> boolean
  getRandomQuote, // (quotes) -> string
  isValidEmail, // (email) -> boolean
  isStrongPassword, // (password) -> boolean
  getInitials, // (name) -> string
  truncateText, // (text, length) -> string
  getPriorityColor, // (priority) -> string (hex color)
  sortTasksByDeadline, // (tasks, order?) -> tasks[]
  filterTasks, // (tasks, filters) -> tasks[]
  getTaskStats, // (tasks) -> stats object
  formatFileSize, // (bytes) -> string
} from "../utils/helpers";
```

**Example Usage:**

```javascript
// Format date
const formatted = formatDate(new Date(), "MMM dd, yyyy");
// Output: "May 15, 2026"

// Get relative time
const relative = getRelativeTime(taskDeadline);
// Output: "2 days left" or "Overdue"

// Check if deadline is soon (within 24 hours)
if (isDeadlineSoon(taskDeadline)) {
  // Send notification
}

// Validate email
if (isValidEmail("user@example.com")) {
  // Email is valid
}

// Get task stats
const stats = getTaskStats(tasks);
// { total: 10, pending: 4, completed: 6, upcoming: 3 }

// Filter tasks
const filtered = filterTasks(tasks, {
  search: "exam",
  priority: "High",
  status: "Pending",
  subject: "Math",
});
```

---

## 🎨 Component Props Reference

### StatsCard

```javascript
<StatsCard
  icon={CheckCircle2} // Lucide icon component
  label="Total Tasks" // string
  value={24} // number
  subtext="+3 from yesterday" // string (optional)
  color="primary" // "primary"|"blue"|"green"|"yellow"|"red"
/>
```

### PriorityBadge

```javascript
<PriorityBadge
  priority="High" // "Low"|"Medium"|"High"
  size="md" // "sm"|"md"|"lg"
/>
```

### StatusBadge

```javascript
<StatusBadge
  status="Completed" // "Pending"|"In Progress"|"Completed"
  size="md" // "sm"|"md"|"lg"
/>
```

### ConfirmDialog

```javascript
<ConfirmDialog
  isOpen={true} // boolean
  title="Delete Task?" // string
  message="Are you sure?" // string
  confirmText="Delete" // string
  cancelText="Cancel" // string
  onConfirm={handleDelete} // function
  onCancel={handleCancel} // function
  isDangerous={true} // boolean (optional, default: false)
/>
```

### ThemeToggle

```javascript
<ThemeToggle />
// Shows sun/moon icon, toggles theme on click
```

---

## 🗂️ Constants Reference (`src/utils/constants.js`)

```javascript
import {
  TASK_TYPES, // ['Assignment', 'Quiz', 'Exam', 'Project']
  PRIORITIES, // ['Low', 'Medium', 'High']
  TASK_STATUSES, // ['Pending', 'In Progress', 'Completed']
  PRIORITY_COLORS, // Object mapping priorities to Tailwind classes
  PRIORITY_BADGE_COLORS, // Object mapping priorities to text colors
  STATUS_COLORS, // Object mapping statuses to Tailwind classes
  MOTIVATIONAL_QUOTES, // Array of inspirational quotes
  NOTIFICATION_TYPES, // Object with notification type constants
  DATE_FORMAT, // 'MMM dd, yyyy'
  DATE_TIME_FORMAT, // 'MMM dd, yyyy HH:mm'
} from "../utils/constants";
```

---

## 🔄 Common Workflows

### Creating a Task

```javascript
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const AddTaskForm = () => {
  const { createTask } = useTasks();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = await createTask({
        title: formData.title,
        type: formData.type,
        subject: formData.subject,
        deadline: formData.deadline,
        priority: formData.priority,
        description: formData.description,
      });

      toast.success("Task created!");
      // Navigate or reset form
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Filtering and Sorting Tasks

```javascript
import { useTasks } from "../hooks/useTasks";
import { sortTasksByDeadline, filterTasks } from "../utils/helpers";

const TaskListPage = () => {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState({
    search: "",
    priority: "All",
    status: "All",
  });

  // Apply filters and sorting
  const processedTasks = sortTasksByDeadline(filterTasks(tasks, filters));

  return (
    <>
      {/* Filter UI */}
      {processedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};
```

### Handling Authentication

```javascript
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // AuthContext handles redirect internally
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Error is handled by useAuth and toast
    }
  };

  return <form onSubmit={handleLogin}>...</form>;
};
```

### Creating a Protected Page

```javascript
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const ProtectedPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Protected content</div>;
};
```

---

## 🔔 Notification System

### Automatic Notifications

The system automatically creates notifications for:

1. **Deadline Soon** - When task deadline is within 24 hours
2. **Task Overdue** - When task deadline has passed
3. **Task Completed** - When user marks task as done
4. **Task Assigned** - When new task is created

### Manual Notification Creation

```javascript
const { addNotification } = useNotifications();

// Add notification
await addNotification("Don't forget your exam is tomorrow!", "deadline");
```

---

## 🎯 Form Validation Patterns

### Email Validation

```javascript
import { isValidEmail } from "../utils/helpers";

if (!isValidEmail(email)) {
  errors.email = "Invalid email format";
}
```

### Password Validation

```javascript
import { isStrongPassword } from "../utils/helpers";

if (!isStrongPassword(password)) {
  errors.password = "Password must be at least 6 characters";
}
```

### Deadline Validation

```javascript
const deadlineDate = new Date(deadline);
if (deadlineDate < new Date()) {
  errors.deadline = "Deadline cannot be in the past";
}
```

---

## 🌐 Firebase Operations

### Creating a User Document

```javascript
import { db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const createUserDoc = async (uid, userData) => {
  await setDoc(doc(db, "users", uid), {
    ...userData,
    createdAt: new Date().toISOString(),
  });
};
```

### Querying Tasks

```javascript
import { db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const fetchUserTasks = async (userId) => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
```

---

## 📊 State Management Patterns

### Using Multiple Contexts

```javascript
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { useNotifications } from "../hooks/useNotifications";

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const { tasks, createTask } = useTasks();
  const { notifications } = useNotifications();

  // Now you have access to all contexts
  return (
    <div>
      <h1>Welcome {userProfile?.name}</h1>
      <p>Tasks: {tasks.length}</p>
      <p>Notifications: {notifications.length}</p>
    </div>
  );
};
```

---

## 🐛 Debugging Tips

### Log User Info

```javascript
const { user, userProfile } = useAuth();
console.log("User:", user);
console.log("Profile:", userProfile);
```

### Log Tasks

```javascript
const { tasks } = useTasks();
console.log("All tasks:", tasks);
```

### Check Theme

```javascript
const { isDark } = useContext(ThemeContext);
console.log("Dark mode:", isDark);
```

### React DevTools

- Inspect component tree
- Check context values
- Profile component performance

---

## 🚀 Performance Optimization

### Memoization

```javascript
import { useMemo } from "react";
import { sortTasksByDeadline } from "../utils/helpers";

const MyComponent = () => {
  const { tasks } = useTasks();

  const sortedTasks = useMemo(() => sortTasksByDeadline(tasks), [tasks]);

  return <TaskList tasks={sortedTasks} />;
};
```

### Lazy Loading Lists

```javascript
const [visibleItems, setVisibleItems] = useState(10)

const handleLoadMore = () => {
  setVisibleItems(prev => prev + 10)
}

{tasks.slice(0, visibleItems).map(task => (...))}
```

---

## 📞 Quick Reference

| Need          | Where to Look                                             |
| ------------- | --------------------------------------------------------- |
| User info     | `useAuth()` - `user`, `userProfile`                       |
| Tasks         | `useTasks()` - `tasks`, `createTask`, etc.                |
| Notifications | `useNotifications()` - `notifications`, `addNotification` |
| Theme         | `ThemeContext` - `isDark`, `toggleTheme`                  |
| Dates         | `date-fns` and `helpers.js` functions                     |
| Icons         | `lucide-react` library                                    |
| Colors        | `constants.js` - color mappings                           |
| API calls     | `firebase.js` and context files                           |

---

This reference covers all major APIs and patterns used in Taskora. Happy coding! 🚀
