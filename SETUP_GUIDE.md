# 🚀 Taskora Setup Guide

## Step-by-Step Installation & Configuration

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Firebase account (free tier available)
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 1️⃣ Project Setup

### Install Dependencies

```bash
cd taskora
npm install
```

This will install all required packages including:

- React 18
- Vite (build tool)
- Firebase SDK
- Tailwind CSS
- Recharts
- Lucide React
- And more...

---

## 2️⃣ Firebase Configuration

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name: `Taskora`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** provider
4. Click **Save**

### Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in production mode**
4. Select region closest to you
5. Click **Create**

### Update Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own documents
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }

    // Tasks belong to users
    match /tasks/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    // Notifications belong to users
    match /notifications/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### Get Firebase Credentials

1. Click the gear icon ⚙️ → **Project Settings**
2. Under "Your apps", click the Web app icon `</>`
3. Copy your Firebase config

Example output:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "taskora-xxx.firebaseapp.com",
  projectId: "taskora-xxx",
  storageBucket: "taskora-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

### Add Credentials to Project

**Option A: Environment Variables (.env.local)**

```bash
# Create .env.local file in project root
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

**Option B: Direct Configuration**
Edit `src/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "taskora-xxx.firebaseapp.com",
  projectId: "taskora-xxx",
  // ... rest of config
};
```

---

## 3️⃣ Start Development

### Run Development Server

```bash
npm run dev
```

Output should show:

```
> vite

  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Access the App

- Open browser to `http://localhost:5173`
- You should see the Welcome page

---

## 4️⃣ Test the Application

### Create Test Account

1. Click **Sign Up**
2. Fill in details:
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test123456
3. Click **Sign Up**

### Test Features

1. **Dashboard**: View welcome banner, stats, and recent tasks
2. **Create Task**: Click "New Task" button
   - Add title, subject, deadline, priority
   - Click "Create Task"
3. **Task List**: View and filter tasks
4. **Profile**: Edit name, bio, and notification preferences

---

## 5️⃣ Build for Production

### Create Production Build

```bash
npm run build
```

Output:

```
dist/
├── index.html
├── assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── ...
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Hosting

**Option A: Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

**Option B: Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Option C: Netlify**

1. Push code to GitHub
2. Connect GitHub to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

## 🔧 Troubleshooting

### Issue: Dependencies not installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Firebase credentials not working

- Verify `.env.local` file exists in project root
- Restart dev server: `npm run dev`
- Check Firebase console → Authentication is enabled
- Check Firestore database rules are updated

### Issue: Login failing

1. Check Firebase Authentication is enabled
2. Verify Firestore rules allow user document creation
3. Check browser console for errors

### Issue: Tasks not saving

1. Verify Firestore Security Rules are correct
2. Check database collection names: `tasks`, `users`, `notifications`
3. Ensure user is authenticated

### Issue: Styles not applying

1. Ensure Tailwind CSS is processing
2. Check `index.css` has Tailwind imports
3. Verify `tailwind.config.js` is correct
4. Restart dev server

---

## 📊 Project Structure Checklist

Verify all files are created:

```
taskora/
├── ✅ src/
│   ├── ✅ components/
│   │   ├── ✅ layout/ (Sidebar.jsx, TopBar.jsx)
│   │   ├── ✅ common/ (7+ components)
│   │   ├── ✅ dashboard/ (4 components)
│   │   └── ✅ notifications/ (2 components)
│   ├── ✅ pages/
│   │   ├── ✅ auth/ (Welcome, Login, Signup)
│   │   ├── ✅ tasks/ (TaskList, AddEditTask, TaskDetail)
│   │   ├── ✅ Dashboard.jsx
│   │   └── ✅ ProfileSettings.jsx
│   ├── ✅ context/ (4 context files)
│   ├── ✅ services/ (firebase.js)
│   ├── ✅ hooks/ (3 hooks)
│   ├── ✅ utils/ (helpers.js, constants.js)
│   ├── ✅ App.jsx
│   ├── ✅ main.jsx
│   └── ✅ index.css
├── ✅ package.json
├── ✅ tailwind.config.js
├── ✅ vite.config.js
├── ✅ postcss.config.js
├── ✅ index.html
├── ✅ .gitignore
└── ✅ README.md
```

---

## 🎯 Feature Checklist

- ✅ Authentication (Login, Signup, Logout)
- ✅ Task Management (Create, Read, Update, Delete)
- ✅ Dashboard with Stats & Charts
- ✅ Task List with Filters & Pagination
- ✅ Task Detail View
- ✅ Profile Settings
- ✅ Notification System
- ✅ Dark/Light Theme Toggle
- ✅ Form Validation
- ✅ Error Handling
- ✅ Protected Routes
- ✅ Responsive Design

---

## 📚 Useful Resources

### Documentation

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)

### Tools

- [Firebase Console](https://console.firebase.google.com)
- [VS Code](https://code.visualstudio.com)
- [React DevTools Extension](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Redux DevTools for Context API](https://www.npmjs.com/package/@react-devtools/core)

---

## 🚀 Performance Tips

1. **Use React DevTools Profiler** to identify slow components
2. **Enable Firebase Analytics** for usage insights
3. **Optimize images** before uploading
4. **Use lazy loading** for large lists
5. **Monitor Firestore usage** in Firebase Console

---

## 🔒 Security Reminders

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use Firestore Security Rules** - Prevent unauthorized access
3. **Enable CORS** - Only for your domain
4. **Regular backups** - Export Firestore data regularly
5. **Monitor API usage** - Stay within Firebase free tier limits

---

## 📞 Support Resources

- Check [Firebase Status Page](https://status.firebase.google.com/)
- Review console errors in browser DevTools
- Check React component tree in React DevTools
- Test API calls in browser Network tab

---

## ✅ Verification Checklist

Before considering the setup complete:

- [ ] npm install completes without errors
- [ ] Development server runs: `npm run dev`
- [ ] Welcome page loads at localhost:5173
- [ ] Can create account with email/password
- [ ] Dashboard displays after login
- [ ] Can create a new task
- [ ] Can view task list with filters
- [ ] Can edit a task
- [ ] Can delete a task
- [ ] Profile settings page loads
- [ ] Theme toggle works
- [ ] Notification bell appears
- [ ] No console errors
- [ ] Production build: `npm run build` succeeds

---

## 🎉 You're All Set!

Your Taskora instance is ready for development. Start building amazing features!

**Project Deadline:** May 30, 2026 ⏰

Good luck! 🚀
