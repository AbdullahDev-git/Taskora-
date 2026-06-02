# Taskora - Technical Summary for Viva

## Project Overview

Taskora is a **Student Task & Deadline Management System** built with React 18 + Vite, styled with Tailwind CSS, and backed by Firebase (Auth + Firestore). It allows students to create, manage, track, and complete academic tasks with deadlines, priorities, and categories.

**Live URL:** Deployed on Vercel

---

## 1. COMPLETE DATA FLOW (Firebase → UI)

```
User Action (click, form submit)
       ↓
React Component (Page)
       ↓
Custom Hook (useAuth / useTasks / useNotifications)
       ↓
Context Provider (AuthContext / TaskContext / NotificationContext)
       ↓
Firebase SDK (firebase/auth or firebase/firestore)
       ↓
Firebase Servers (Authentication / Firestore Database)
       ↓
Response comes back to Context Provider
       ↓
State updates (React useState)
       ↓
Re-render happens → UI updates automatically
```

### Simplified:
- User types email + password → Login.jsx calls `login()` from useAuth hook → AuthContext calls Firebase `signInWithEmailAndPassword()` → Firebase verifies → user data returned → React state updates → Dashboard screen appears

---

## 2. FILE-BY-FILE EXPLANATION

### 🔹 Entry Point

#### `src/main.jsx`
- Entry point of the entire app
- `ReactDOM.createRoot()` mounts the App component into the HTML div with id="root"
- Wrapped in `<React.StrictMode>` which helps catch bugs during development

#### `src/index.css`
- Imports Tailwind CSS base, components, utilities
- Defines global styles: body background/text colors, scrollbar styling
- Custom utility classes: `.card` (white bg, rounded, shadow), `.btn-primary` (purple button), `.input-field` (form input styling), `.badge` (tag styling)
- Dark mode is applied via `.dark` class on `<html>` element

---

### 🔹 Firebase Configuration

#### `src/services/firebase.js`
- Configures and initializes Firebase with project credentials
- Exports `auth` (Firebase Authentication instance) and `db` (Firestore database instance)
- These are imported by all context providers to interact with Firebase
- **Key:** Without this file, nothing connects to the backend

---

### 🔹 Context Providers (State Management)

Context API is React's built-in state management. Each context:
1. Creates a Context using `createContext()`
2. Provides a Provider component that wraps children
3. Exposes state and functions through `value` prop
4. Any child component can access this via a custom hook

#### `src/context/AuthContext.jsx`
**Purpose:** Manages all authentication state and operations

**What it does:**
- `useState` stores: `user` (Firebase Auth user), `userProfile` (Firestore user doc), `loading`, `error`
- On mount: calls `auth.onAuthStateChanged()` which listens for auth state changes (if user is logged in, it auto-restores the session)
- **`signup(email, password, fullName)`**: Calls `createUserWithEmailAndPassword()` to create Firebase Auth account, then creates a user document in Firestore `users` collection with name, email, notification preferences
- **`login(email, password)`**: Calls `signInWithEmailAndPassword()`, then fetches user profile from Firestore
- **`logout()`**: Calls `signOut(auth)` and clears user state
- **`forgotPassword(email)`**: Calls `sendPasswordResetEmail()` — Firebase sends a reset link email
- **`updateProfile(updates)`**: Updates the user's Firestore document with new data (name, bio, preferences)
- Uses `browserLocalPersistence` so user stays logged in even after browser close
- Exposes: `user`, `userProfile`, `loading`, `signup()`, `login()`, `logout()`, `forgotPassword()`, `updateProfile()`, `isAuthenticated`

#### `src/context/TaskContext.jsx`
**Purpose:** Manages all task CRUD operations

**What it does:**
- Stores: `tasks` array, `loading`, `error`
- Requires `userId` prop — ensures data isolation (each user sees only their tasks)
- **`fetchTasks()`**: Queries Firestore `tasks` collection WHERE userId matches, ordered by deadline ascending. Runs on mount automatically via `useEffect`
- **`createTask(taskData)`**: Adds a new document to Firestore `tasks` collection with title, type, subject, deadline, priority, description, status="Pending", userId. Updates local state optimistically
- **`updateTask(taskId, updates)`**: Updates specific fields in a Firestore document. Updates local state by mapping over tasks array
- **`deleteTask(taskId)`**: Deletes document from Firestore. Removes from local state with filter
- **`toggleTaskStatus(taskId, currentStatus)`**: Flips between "Pending" and "Completed" by calling updateTask
- **`getTaskById(taskId)`**: Synchronous lookup in local tasks array (no Firebase call needed since we already have all tasks)
- Uses `toast.success()`/`toast.error()` for user feedback on every operation

#### `src/context/NotificationContext.jsx`
**Purpose:** Manages notifications for deadlines and overdue tasks

**What it does:**
- Stores: `notifications` array, `unreadCount`, `loading`
- **`fetchNotifications()`**: Queries Firestore `notifications` collection WHERE userId matches, ordered by timestamp descending
- **`addNotification(message, type)`**: Creates a notification in Firestore with userId, message, type, isRead=false
- **`markAsRead(notificationId)`**: Updates isRead to true in Firestore, decrements unreadCount
- **`markAllAsRead()`**: Loops through all unread notifications and updates each in Firestore, sets unreadCount to 0
- **`deleteNotification(notificationId)`**: Deletes from Firestore, adjusts unreadCount if it was unread

#### `src/context/ThemeContext.jsx`
**Purpose:** Manages dark/light theme switching

**What it does:**
- Default theme is "dark" (falls back from localStorage)
- **`toggleTheme()`**: Flips between dark/light, saves to localStorage, toggles `dark` class on `<html>` element
- Tailwind CSS's `darkMode: "class"` applies dark styles when the `dark` class is present
- `mounted` flag prevents hydration mismatch (theme applied after initial render)

---

### 🔹 Custom Hooks

Each hook follows the same pattern: access the context using `useContext()` and throw an error if used outside the provider.

#### `src/hooks/useAuth.js`
- Simply returns `useContext(AuthContext)` 
- Throws: "useAuth must be used within AuthProvider" if called outside

#### `src/hooks/useTasks.js`
- Returns `useContext(TaskContext)`
- Throws if used outside TaskProvider

#### `src/hooks/useNotifications.js`
- Returns `useContext(NotificationContext)`
- Throws if used outside NotificationProvider

---

### 🔹 Layout Components

#### `src/components/layout/Sidebar.jsx`
**Purpose:** Fixed left navigation panel

**Props:** `collapsed` (boolean), `onToggle` (function)

**What it renders:**
- Width: 256px (expanded) or 64px (collapsed), smooth transition
- Top: GraduationCap icon + "Taskora" text (expanded) or just icon (collapsed)
- Navigation items: Dashboard, Tasks, Profile — each with an icon + label
- Active route is highlighted with purple background using `location.pathname` comparison
- Bottom section: user name in expanded mode, collapse toggle button (chevron), logout button
- Collapsed mode: only icons visible, labels hidden, tooltips appear on hover via `title` attribute

#### `src/components/layout/TopBar.jsx`
**Purpose:** Top bar shown above page content

**What it renders:**
- Right side: Theme toggle button, Notification bell with badge, User avatar (initials) + name + dropdown
- Dropdown: Profile link, Log Out button
- Click outside closes dropdown via `useRef` + `mousedown` event listener

---

### 🔹 Common Components

#### `src/components/common/PrivateRoute.jsx`
**Purpose:** Protects authenticated routes from unauthorized access

**Logic:**
1. If auth is loading → show `<Loader />` (full-screen spinner)
2. If not authenticated → redirect to `/login`
3. If authenticated → render Sidebar + TopBar + page content (`<Outlet />`)
4. Wraps content in `<TaskProvider>` and `<NotificationProvider>` so pages have access to task/notification data
5. Manages sidebar collapse state via `useState`

#### `src/components/common/Loader.jsx`
- Full-screen centered loading spinner
- Animated gradient ring with "Loading..." text

#### `src/components/common/ConfirmDialog.jsx`
**Props:** isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, isDangerous

**Logic:**
- If `isOpen` is false, returns null (renders nothing)
- Shows a modal overlay with backdrop blur
- Cancel button closes, Confirm button calls onConfirm
- If `isDangerous` is true, confirm button is red (used for delete operations)

#### `src/components/common/StatsCard.jsx`
**Props:** icon, label, value, subtext, color

- Displays a statistic card with colored icon background, value, label, and optional subtext
- Color options: primary (purple), blue, green, yellow, red

#### `src/components/common/ThemeToggle.jsx`
- Shows Sun icon (click to switch to light) or Moon icon (click to switch to dark)
- Reads from ThemeContext, calls `toggleTheme()`
- Returns null until mounted to prevent flash of wrong theme

#### `src/components/common/PriorityBadge.jsx`
**Props:** priority (Low/Medium/High), size

- Renders a colored badge: Low=Green, Medium=Yellow, High=Red
- Colors come from `PRIORITY_COLORS` constant

#### `src/components/common/StatusBadge.jsx`
**Props:** status (Pending/In Progress/Completed), size

- Renders a colored badge: Pending=Blue, In Progress=Yellow, Completed=Green
- Colors come from `STATUS_COLORS` constant

---

### 🔹 Dashboard Components

#### `src/components/dashboard/WelcomeBanner.jsx`
**Props:** userName, tasks[]

**Logic:**
- Shows "Welcome back, [Name]!" with current date
- Calculates completion rate: `(completedTasks / totalTasks) * 100`
- Displays a daily motivational quote — selected using `useMemo` based on day-of-year + userName length, so quote stays same all day and changes daily

#### `src/components/dashboard/StatsRow.jsx`
**Props:** tasks[]

- Calls `getTaskStats()` helper which calculates: total, pending, completed, upcoming (within 7 days)
- Renders 4 StatsCards in a grid: Total Tasks, Pending, Completed (with success rate %), Upcoming (next 7 days)

#### `src/components/dashboard/RecentTasksTable.jsx`
**Props:** tasks[], onDelete

- Shows latest 5 tasks (`tasks.slice(0, 5)`) in a table
- Columns: Task Name, Subject, Deadline (with relative time), Priority badge, Status badge, Actions (View/Edit/Delete)
- Empty state: "No tasks yet. Create one to get started!"

#### `src/components/dashboard/TaskProgressChart.jsx`
**Props:** tasks[]

- Uses Recharts `<PieChart>` with donut style (`innerRadius=60, outerRadius=100`)
- Counts tasks by type (Assignment=Blue, Quiz=Purple, Exam=Pink, Project=Yellow)
- Filters out types with 0 count
- Shows numeric breakdown below the chart
- Empty state: "No tasks to display"

---

### 🔹 Notification Components

#### `src/components/notifications/NotificationBell.jsx`
- Shows Bell icon with red badge showing unread count
- Badge: if >9 unread, shows "9+"
- Click toggles NotificationDropdown

#### `src/components/notifications/NotificationDropdown.jsx`
**Props:** onClose

- Shows list of notifications with message, timestamp, unread indicator (blue dot + blue background)
- Each notification has a delete button
- Header shows unread count
- Footer has "Mark all as read" button
- Empty state: "No notifications yet"
- Scrollable list (max-height: 384px)

---

### 🔹 Pages

#### Public Pages (No Sidebar)

##### `src/pages/auth/Welcome.jsx`
**Route:** `/`

- Landing page with dark gradient background
- GraduationCap logo + "Taskora" title
- Tagline: "Organize your academics. Own your time."
- Three feature descriptions: Smart Scheduling, Academic Insights, Seamless Sync
- Login and Signup buttons linking to `/login` and `/signup`
- Footer with copyright

##### `src/pages/auth/Login.jsx`
**Route:** `/login`

- Form with email and password fields
- Password field has show/hide toggle (Eye/EyeOff icons)
- Validation: email required + valid format, password required
- Forgot password link → `/forgot-password`
- Link to Signup page
- Loading state: button shows "Signing in..."
- Error messages shown via toast and inline error text
- On success: navigates to `/dashboard`

##### `src/pages/auth/Signup.jsx`
**Route:** `/signup`

- Form: Full name, Email, Password, Confirm password
- All fields validated (required, email format, password min 6 chars, passwords match)
- Show/hide toggle on both password fields
- Link to Login page
- On success: creates Firebase account + Firestore profile, navigates to `/dashboard`

##### `src/pages/auth/ForgotPassword.jsx`
**Route:** `/forgot-password`

- Email input with validation
- Calls `forgotPassword()` from AuthContext which triggers Firebase password reset email
- Success state: shows green success message instead of form
- Link back to Login

#### Authenticated Pages (With Sidebar + TopBar)

##### `src/pages/Dashboard.jsx`
**Route:** `/dashboard`

- Orchestrates all dashboard components
- **Auto-notification creation:** On load, checks every task:
  - If overdue → creates "Overdue" notification
  - If due within 24 hours → creates "Due soon" notification
  - Uses `useRef(new Set())` to prevent duplicate notifications
- Delete task: shows ConfirmDialog, calls deleteTask on confirm
- Loading state: shows 4 skeleton cards for StatsRow while tasks load
- Grid layout: RecentTasksTable (2/3 width) + TaskProgressChart (1/3 width)

##### `src/pages/tasks/TaskList.jsx`
**Route:** `/tasks`

- Table with columns: Task Name, Type, Subject, Deadline, Priority, Status, Actions
- **Search:** filters tasks by title (case-insensitive)
- **Filters:** Status dropdown, Priority dropdown, Subject dropdown (auto-populated from task data), Date filter (All/Overdue/Today/This Week/This Month)
- **Pagination:** 10 items per page with Previous/Next buttons and page numbers
- Empty states: "No tasks yet" vs "No tasks match your filters"
- Loading state: 3 skeleton rows while data loads
- Actions: View (→ `/tasks/:id`), Edit (→ `/tasks/edit/:id`), Delete (with ConfirmDialog)

##### `src/pages/tasks/AddEditTask.jsx`
**Routes:** `/tasks/add` (create), `/tasks/edit/:id` (edit)

- Single component handles both create and edit
- Detects mode by checking if `id` param exists
- **Create mode:** Empty form, creates task on submit
- **Edit mode:** Pre-fills form using `getTaskById(id)`, updates on submit
- Fields: Title, Type (dropdown), Priority (dropdown), Subject, Deadline (date input), Description (textarea)
- Validation: title required, subject required, deadline required, deadline not in past
- Error clearing on input change (reactive)
- Cancel button navigates back
- Success: navigates to task detail page

##### `src/pages/tasks/TaskDetail.jsx`
**Route:** `/tasks/:id`

- Gets task by ID from local state (synchronous lookup via `getTaskById`)
- **Not found state:** "Task not found" with back button
- **Layout:**
  - Left (2/3): Title + Priority badge + Created date, Description, Activity timeline
  - Right (1/3): Status card with toggle button, Details card (Type, Subject, Deadline with relative time, Priority)
- Edit button → `/tasks/edit/:id`
- Delete button → ConfirmDialog → delete → navigate to `/tasks`
- Toggle status button: flips between Pending/Completed with success toast

##### `src/pages/ProfileSettings.jsx`
**Route:** `/profile`

- **User Header Card:** Avatar with initials, user name, email, Pro Member badge, dynamic Active Tasks count
- **Personal Info:** First name, Last name, Email (editable!), Bio textarea, Save button
  - Email change: uses `verifyBeforeUpdateEmail()` which sends verification link to new email
- **Notification Preferences:** 3 toggle switches (Deadline Reminders, Daily Summary, Overdue Alerts) — saved to Firestore immediately
- **Security:** Current password, New password, Confirm password
  - Real implementation using Firebase `updatePassword()` with reauthentication via `EmailAuthProvider`
- **Danger Zone:** Delete account button with confirmation
  - Real implementation: deletes all user's tasks, notifications, and profile from Firestore, then calls `deleteUser()` from Firebase Auth

---

### 🔹 Utilities

#### `src/utils/constants.js`
- `TASK_TYPES`: ['Assignment', 'Quiz', 'Exam', 'Project']
- `PRIORITIES`: ['Low', 'Medium', 'High']
- `TASK_STATUSES`: ['Pending', 'In Progress', 'Completed']
- `PRIORITY_COLORS`: Tailwind classes — Low=Green, Medium=Yellow, High=Red
- `STATUS_COLORS`: Tailwind classes — Pending=Blue, In Progress=Yellow, Completed=Green
- `MOTIVATIONAL_QUOTES`: Array of 10 quotes
- Date format strings

#### `src/utils/helpers.js`
- `formatDate(date, formatStr)`: Formats date using date-fns
- `getRelativeTime(date)`: Returns "Overdue", "Today", "Tomorrow", or "X days left"
- `isDeadlineSoon(date)`: Checks if within 24 hours
- `isTaskOverdue(date)`: Checks if deadline has passed
- `getRandomQuote(quotes)`: Picks random quote (kept for reference, replaced by date-based in WelcomeBanner)
- `isValidEmail(email)`: Regex validation
- `isStrongPassword(password)`: Min 6 chars
- `getInitials(name)`: Returns first 2 initials in uppercase
- `capitalizeName(name)`: Capitalizes first letter of each word
- `getTaskStats(tasks)`: Calculates total, pending, completed, upcoming counts

---

## 3. COMPONENT HIERARCHY

```
main.jsx
  └── App.jsx
       ├── ThemeProvider
       │    └── AuthProvider
       │         └── Router
       │              ├── / → Welcome.jsx
       │              ├── /login → Login.jsx
       │              ├── /signup → Signup.jsx
       │              ├── /forgot-password → ForgotPassword.jsx
       │              │
       │              └── PrivateRoute (Protected)
       │                   ├── Sidebar.jsx
       │                   ├── TopBar.jsx
       │                   │    ├── ThemeToggle.jsx
       │                   │    ├── NotificationBell.jsx
       │                   │    │    └── NotificationDropdown.jsx
       │                   │    └── User dropdown (Profile, Log Out)
       │                   │
       │                   ├── TaskProvider
       │                   │    └── NotificationProvider
       │                   │         └── <Outlet />
       │                   │              ├── /dashboard → Dashboard.jsx
       │                   │              │    ├── WelcomeBanner.jsx
       │                   │              │    ├── StatsRow.jsx
       │                   │              │    │    └── StatsCard.jsx (×4)
       │                   │              │    ├── RecentTasksTable.jsx
       │                   │              │    │    ├── PriorityBadge.jsx
       │                   │              │    │    └── StatusBadge.jsx
       │                   │              │    ├── TaskProgressChart.jsx (Recharts PieChart)
       │                   │              │    └── ConfirmDialog.jsx
       │                   │              │
       │                   │              ├── /tasks → TaskList.jsx
       │                   │              │    ├── PriorityBadge.jsx
       │                   │              │    ├── StatusBadge.jsx
       │                   │              │    └── ConfirmDialog.jsx
       │                   │              │
       │                   │              ├── /tasks/add → AddEditTask.jsx
       │                   │              ├── /tasks/edit/:id → AddEditTask.jsx
       │                   │              ├── /tasks/:id → TaskDetail.jsx
       │                   │              │    ├── PriorityBadge.jsx
       │                   │              │    ├── StatusBadge.jsx
       │                   │              │    └── ConfirmDialog.jsx
       │                   │              │
       │                   │              └── /profile → ProfileSettings.jsx
       │                   │                   ├── ConfirmDialog.jsx
       │                   │                   └── (uses useTasks for task count)
       │                   │
       │                   └── Toaster (react-hot-toast)
```

---

## 4. ROUTING SUMMARY

| Path | Component | Auth Required | Sidebar |
|------|-----------|---------------|---------|
| `/` | Welcome | No | No |
| `/login` | Login | No | No |
| `/signup` | Signup | No | No |
| `/forgot-password` | ForgotPassword | No | No |
| `/dashboard` | Dashboard | Yes | Yes |
| `/tasks` | TaskList | Yes | Yes |
| `/tasks/add` | AddEditTask | Yes | Yes |
| `/tasks/edit/:id` | AddEditTask | Yes | Yes |
| `/tasks/:id` | TaskDetail | Yes | Yes |
| `/profile` | ProfileSettings | Yes | Yes |

---

## 5. FIRESTORE DATA STRUCTURE

### Users Collection
```
users/{uid}
  - uid: string
  - name: string
  - email: string
  - bio: string
  - createdAt: timestamp
  - preferences: {
      theme: "dark" | "light",
      notifications: {
        deadlineReminders: boolean,
        dailySummary: boolean,
        overdueAlerts: boolean
      }
    }
```

### Tasks Collection
```
tasks/{taskId}
  - userId: string (links to user)
  - title: string
  - type: "Assignment" | "Quiz" | "Exam" | "Project"
  - subject: string
  - deadline: date
  - priority: "Low" | "Medium" | "High"
  - status: "Pending" | "In Progress" | "Completed"
  - description: string
  - createdAt: timestamp
```

### Notifications Collection
```
notifications/{notifId}
  - userId: string (links to user)
  - message: string
  - type: string
  - isRead: boolean
  - timestamp: timestamp
```

---

## 6. KEY FUNCTIONALITIES EXPLAINED

### Authentication Flow
1. User signs up → Firebase Auth creates account → user document created in Firestore
2. User logs in → Firebase verifies credentials → profile fetched from Firestore
3. Page refresh → `onAuthStateChanged` fires → session restored from localStorage persistence → profile fetched → user stays logged in
4. Logout → Firebase sign out → state cleared

### Task CRUD Flow
1. **Create:** Form validation → Firebase `addDoc()` → task appears in list immediately (optimistic update)
2. **Read:** `getDocs()` query filtered by userId → sorted by deadline → stored in state → rendered in table
3. **Update:** Pre-fill form from state → Firebase `updateDoc()` → state updated with map function
4. **Delete:** ConfirmDialog → Firebase `deleteDoc()` → state updated with filter

### Notification Auto-Creation
- On Dashboard mount, every task is checked:
  - If deadline passed AND status is not "Completed" → "Overdue" notification
  - If deadline is within 24 hours → "Due soon" notification
- Uses `useRef` Set to prevent duplicate notifications on re-renders

### Theme Persistence
- Theme saved to `localStorage` as "dark" or "light"
- On page load, theme is read from localStorage and applied before render
- Toggle updates localStorage and toggles `dark` class on `<html>` element

---

## 7. DEPLOYMENT (Vercel)

- Framework auto-detected: Vite
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables needed (Firebase credentials are in source — safe for client-side apps)
- Auto-deploys on every push to GitHub main branch
