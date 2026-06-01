# Taskora - Student Task & Deadline Management System

A complete, production-ready web application built with React, Vite, and Firebase. Taskora helps students organize their academic tasks, manage deadlines, and track their progress efficiently.

## 🎯 Project Overview

**Project Deadline:** May 30, 2026

Taskora is a student portal designed to:

- ✅ Organize academic tasks and assignments
- 📊 Track progress with analytics and insights
- 🔔 Receive intelligent notifications
- 🌓 Support dark/light theme switching
- 🔐 Secure authentication with Firebase
- 📱 Responsive, modern UI with Tailwind CSS

## 🏗️ Project Structure

```
taskora/
├── src/
│   ├── components/
│   │   ├── layout/           # Sidebar, TopBar
│   │   ├── common/           # Reusable components
│   │   ├── dashboard/        # Dashboard components
│   │   └── notifications/    # Notification system
│   ├── pages/
│   │   ├── auth/             # Authentication pages
│   │   ├── tasks/            # Task management pages
│   │   ├── Dashboard.jsx
│   │   └── ProfileSettings.jsx
│   ├── context/              # State management
│   ├── services/             # Firebase integration
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utilities & constants
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind styles
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd taskora
npm install
```

### 2. Configure Firebase

Create a `.env.local` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Or update `src/services/firebase.js` directly with your Firebase credentials.

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## 🔐 Authentication Flow

1. **Welcome Page** (`/`) - Landing page with info and CTA buttons
2. **Sign Up** (`/signup`) - Create new account
3. **Login** (`/login`) - Sign in with email/password
4. **Dashboard** (`/dashboard`) - Main app interface (protected)

## 📋 Application Routes

### Public Routes (No Authentication Required)

- `/` - Welcome page
- `/login` - Login page
- `/signup` - Sign up page

### Protected Routes (Authentication Required)

- `/dashboard` - Main dashboard
- `/tasks` - Task list with filters
- `/tasks/add` - Create new task
- `/tasks/edit/:id` - Edit existing task
- `/tasks/:id` - Task detail view
- `/profile` - Profile & settings

## ⚙️ Key Features

### 1. Authentication

- Email/password registration and login
- Firebase Authentication
- Persistent login state (localStorage)
- Password reset functionality

### 2. Task Management

- ✏️ Create, read, update, delete (CRUD)
- 📍 Assign task types: Assignment, Quiz, Exam, Project
- 🎯 Set priorities: Low, Medium, High
- 📅 Track deadlines with smart date handling
- ✅ Mark tasks as Pending/In Progress/Completed
- 🏷️ Categorize by subject

### 3. Dashboard

- 👋 Personalized welcome banner with motivational quotes
- 📊 Real-time stats: Total, Pending, Completed, Upcoming tasks
- 📈 Task progress visualization (pie/donut chart)
- 📝 Recent tasks table with quick actions

### 4. Task List

- 🔍 Search by title
- 🎯 Filter by: Status, Priority, Subject
- 📄 Pagination (10 items per page)
- ⚡ Quick actions: View, Edit, Delete

### 5. Task Detail

- 📖 Full task information view
- 📝 Rich description with formatting
- 🔄 Toggle task status
- 📊 Task metadata (type, subject, deadline)
- 🗑️ Delete with confirmation

### 6. Notifications

- 🔔 Bell icon with unread badge
- 📬 Dropdown notification panel
- ✓ Mark as read functionality
- 🗑️ Delete individual notifications
- ⏰ Timestamp for each notification

### 7. User Profile

- 👤 Edit personal information
- 📧 Email display (read-only)
- 📝 Bio/description
- 🔔 Notification preferences (toggles)
- 🔐 Password change form
- 🗑️ Account deletion

### 8. Theme System

- 🌓 Dark/Light theme toggle
- 💾 Persistent theme preference
- 🎨 Tailwind dark mode CSS classes

## 🛠️ Tech Stack

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| **React 18**        | UI framework              |
| **Vite**            | Build tool                |
| **React Router v6** | Routing & navigation      |
| **Tailwind CSS**    | Styling                   |
| **Firebase**        | Authentication & Database |
| **Firestore**       | Real-time database        |
| **Recharts**        | Data visualization        |
| **Lucide React**    | Icon library              |
| **date-fns**        | Date manipulation         |
| **react-hot-toast** | Toast notifications       |
| **Context API**     | State management          |

## 📁 File Descriptions

### Services (`src/services/`)

- **firebase.js** - Firebase configuration and initialization

### Context Providers (`src/context/`)

- **AuthContext.jsx** - Authentication state & methods
- **ThemeContext.jsx** - Theme management
- **TaskContext.jsx** - Task CRUD operations
- **NotificationContext.jsx** - Notification management

### Custom Hooks (`src/hooks/`)

- **useAuth()** - Access authentication context
- **useTasks()** - Access tasks context
- **useNotifications()** - Access notifications context

### Components

#### Layout Components

- **Sidebar.jsx** - Navigation sidebar
- **TopBar.jsx** - Top navigation bar

#### Common Components

- **PrivateRoute.jsx** - Protected route wrapper
- **Loader.jsx** - Loading spinner
- **ConfirmDialog.jsx** - Confirmation modal
- **PriorityBadge.jsx** - Priority indicator
- **StatusBadge.jsx** - Status indicator
- **ThemeToggle.jsx** - Theme switcher
- **StatsCard.jsx** - Statistics card

#### Dashboard Components

- **WelcomeBanner.jsx** - Personalized welcome section
- **StatsRow.jsx** - Statistics cards grid
- **RecentTasksTable.jsx** - Recent tasks table
- **TaskProgressChart.jsx** - Task progress visualization

#### Notification Components

- **NotificationBell.jsx** - Bell icon with badge
- **NotificationDropdown.jsx** - Notifications panel

## 📊 Data Models

### Users Collection

```javascript
{
  uid: "string",
  name: "string",
  email: "string",
  bio: "string",
  createdAt: "timestamp",
  preferences: {
    theme: "dark|light",
    notifications: {
      deadlineReminders: boolean,
      dailySummary: boolean,
      overdueAlerts: boolean
    }
  }
}
```

### Tasks Collection

```javascript
{
  userId: "string",
  title: "string",
  type: "Assignment|Quiz|Exam|Project",
  subject: "string",
  deadline: "date",
  priority: "Low|Medium|High",
  status: "Pending|In Progress|Completed",
  description: "string",
  createdAt: "timestamp"
}
```

### Notifications Collection

```javascript
{
  userId: "string",
  message: "string",
  type: "string",
  isRead: boolean,
  timestamp: "timestamp"
}
```

## 🎨 Color Scheme

### Primary Colors (Indigo/Violet)

- Primary 600: `#7c3aed` (Main brand color)
- Primary 500: `#8b5cf6`
- Primary 700: `#6d28d9`

### Dark Mode

- Background: `#0f172a` (slate-950)
- Background Secondary: `#1e293b` (slate-900)
- Text Primary: `#f1f5f9` (slate-100)
- Border: `#475569` (slate-600)

## 🔄 Component Flow

```
App.jsx
├── ThemeProvider
└── AuthProvider
    ├── Public Routes
    │   ├── Welcome
    │   ├── Login
    │   └── Signup
    └── PrivateRoute
        ├── Sidebar
        ├── TopBar
        └── Pages
            ├── Dashboard (with TaskProvider, NotificationProvider)
            ├── TaskList (with TaskProvider, NotificationProvider)
            ├── AddEditTask (with TaskProvider, NotificationProvider)
            ├── TaskDetail (with TaskProvider, NotificationProvider)
            └── ProfileSettings
```

## 📝 Coding Conventions

1. **Components**: Functional components with React Hooks only
2. **Styling**: Tailwind CSS classes (no custom CSS except globals)
3. **State Management**: Context API (no Redux)
4. **Async Operations**: async/await with try/catch
5. **Error Handling**: react-hot-toast notifications
6. **Comments**: Meaningful comments for complex logic
7. **File Structure**: Follow the folder structure strictly
8. **Naming**: camelCase for variables/functions, PascalCase for components

## 🚨 Error Handling

All errors are handled with:

- Try/catch blocks for async operations
- Toast notifications via react-hot-toast
- Console logging for debugging
- User-friendly error messages

## 🔒 Security Features

1. **Firebase Authentication** - Secure user management
2. **Protected Routes** - Redirect to login if not authenticated
3. **Firestore Security Rules** - User-level data isolation
4. **Local Storage** - Theme preference only (no sensitive data)
5. **Password Validation** - Minimum 6 characters

## 📱 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Minimum width: 1280px (Desktop only)

## 📚 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "firebase": "^10.7.0",
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.293.0",
  "recharts": "^2.10.3",
  "date-fns": "^2.30.0",
  "react-hot-toast": "^2.4.1"
}
```

## 🎯 Next Steps

1. ✅ Complete project structure created
2. ✅ All core components built
3. ✅ Firebase integration ready
4. ⏭️ Configure Firebase credentials
5. ⏭️ Test all features
6. ⏭️ Deploy to production

## 📞 Support

For issues or questions, check:

1. Browser console for errors
2. Firebase console for database issues
3. React DevTools for component state
4. Network tab for API calls

## 📄 License

© 2026 Taskora Academic Systems. All rights reserved.

---

**Happy coding! 🚀**
