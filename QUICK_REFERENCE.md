# ⚡ Taskora - Quick Reference Card

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
cd taskora
npm install

# 2. Add Firebase credentials to src/services/firebase.js
# (Copy from Firebase Console)

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173
# 5. Sign up and start using!
```

---

## 📍 Most Important Files

| What You Need | File Location |
|---------------|---------------|
| Set Firebase creds | `src/services/firebase.js` |
| Add auth logic | `src/context/AuthContext.jsx` |
| Add task logic | `src/context/TaskContext.jsx` |
| Main routes | `src/App.jsx` |
| Dashboard view | `src/pages/Dashboard.jsx` |
| Task list view | `src/pages/tasks/TaskList.jsx` |
| Global styles | `src/index.css` |

---

## 🔑 Key Shortcuts (What's Available)

```javascript
// In any component:

// Get user info
const { user, userProfile } = useAuth()

// Manage tasks
const { tasks, createTask, updateTask } = useTasks()

// Handle notifications
const { notifications } = useNotifications()

// Switch theme
const { isDark, toggleTheme } = useContext(ThemeContext)

// Format dates
import { formatDate, getRelativeTime } from '../utils/helpers'

// Get constants
import { TASK_TYPES, PRIORITIES } from '../utils/constants'
```

---

## 🛠️ Common Tasks

### Create a Task
```javascript
const { createTask } = useTasks()

await createTask({
  title: 'My Task',
  type: 'Assignment',
  subject: 'Math',
  deadline: '2026-05-25',
  priority: 'High',
  description: 'Task details'
})
```

### Update a Task
```javascript
const { updateTask } = useTasks()

await updateTask(taskId, {
  status: 'Completed',
  description: 'Updated description'
})
```

### Delete a Task
```javascript
const { deleteTask } = useTasks()

await deleteTask(taskId)
```

### Get User Profile
```javascript
const { userProfile } = useAuth()

console.log(userProfile.name)
console.log(userProfile.email)
```

### Show Toast Notification
```javascript
import toast from 'react-hot-toast'

toast.success('Success message')
toast.error('Error message')
toast.loading('Loading...')
```

---

## 🎨 Styling Quick Reference

```jsx
// Buttons
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>

// Input Fields
<input className="input-field" placeholder="..." />

// Cards
<div className="card p-6">Content</div>

// Badges
<PriorityBadge priority="High" />
<StatusBadge status="Completed" />

// Dark Mode
<div className="text-gray-900 dark:text-dark-text">
  Text that works in both themes
</div>

// Grid Layouts
<div className="grid grid-cols-4 gap-6">
  {/* 4 columns on desktop */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Responsive: 1 col mobile, 2 md, 4 lg */}
</div>
```

---

## 📋 Form Template

```jsx
const [formData, setFormData] = useState({
  title: '',
  priority: 'Medium'
})
const [errors, setErrors] = useState({})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }))
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Validate
  if (!formData.title) {
    setErrors({ title: 'Required' })
    return
  }

  // Submit
  try {
    await createTask(formData)
    toast.success('Created!')
  } catch (err) {
    toast.error('Failed')
  }
}

return (
  <form onSubmit={handleSubmit}>
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="input-field"
    />
    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
    <button type="submit" className="btn-primary">Submit</button>
  </form>
)
```

---

## 🔄 Common Patterns

### Protected Page
```jsx
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const MyPage = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/login" />

  return <div>Protected content</div>
}
```

### Fetch Data on Mount
```jsx
import { useEffect } from 'react'
import { useTasks } from '../hooks/useTasks'

const MyComponent = () => {
  const { tasks, fetchTasks, loading } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  if (loading) return <Loader />
  return <div>{tasks.map(task => ...)}</div>
}
```

### Filter & Sort
```jsx
const { tasks } = useTasks()

// Filter
const filtered = tasks.filter(t => 
  t.title.includes(search) && 
  t.priority === 'High'
)

// Sort by deadline
const sorted = filtered.sort((a, b) =>
  new Date(a.deadline) - new Date(b.deadline)
)

// Paginate
const page = 1
const itemsPerPage = 10
const paginated = sorted.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
)
```

---

## ⚠️ Common Mistakes to Avoid

❌ **Don't:** Forget to import hooks
```javascript
// Wrong
const tasks = useTasks() // ❌ Not in return position
```

✅ **Do:** Import and use hooks properly
```javascript
import { useTasks } from '../hooks/useTasks'
// In component:
const { tasks } = useTasks()
```

---

❌ **Don't:** Mutate state directly
```javascript
// Wrong
tasks.push(newTask) // ❌ Direct mutation
```

✅ **Do:** Create new array
```javascript
// Correct
const newTasks = [...tasks, newTask]
```

---

❌ **Don't:** Forget to add error handling
```javascript
// Wrong
await updateTask(taskId, data) // ❌ No try/catch
```

✅ **Do:** Wrap in try/catch
```javascript
// Correct
try {
  await updateTask(taskId, data)
  toast.success('Updated!')
} catch (error) {
  toast.error('Failed')
}
```

---

## 🔧 Debugging Tips

### Check Current User
```javascript
const { user, userProfile } = useAuth()
console.log('User:', user)
console.log('Profile:', userProfile)
```

### Check All Tasks
```javascript
const { tasks } = useTasks()
console.log('Tasks:', tasks)
console.log('Count:', tasks.length)
```

### Check Theme
```javascript
const { isDark } = useContext(ThemeContext)
console.log('Dark mode:', isDark)
```

### React DevTools
1. Install React DevTools extension
2. Open DevTools → Components tab
3. Search for component
4. Check props and state

### Firebase Console
1. Go to Firebase Console
2. Check Firestore Database
3. Verify data structure
4. Check Security Rules

---

## 📦 Deployment Commands

```bash
# Build for production
npm run build

# Test production build
npm run preview

# Deploy to Firebase
firebase deploy

# Deploy to Vercel
vercel

# Deploy to Netlify
# Push to GitHub, connect to Netlify
```

---

## 🎯 Feature Checklist

When adding a new feature:

- [ ] Add state to appropriate context
- [ ] Create utility functions in `helpers.js`
- [ ] Build UI component
- [ ] Add validation
- [ ] Add error handling
- [ ] Add loading state
- [ ] Add toast notifications
- [ ] Update README
- [ ] Test in both light/dark mode
- [ ] Test on different screen sizes

---

## 📞 Quick Help

**Login not working?**
1. Check Firebase credentials
2. Verify email format
3. Check browser console for errors
4. Check Firebase Authentication is enabled

**Tasks not saving?**
1. Check Firestore rules
2. Verify database collections exist
3. Check network in DevTools
4. Look at browser console

**Styles not applying?**
1. Verify Tailwind classes are correct
2. Check dark mode is working
3. Restart dev server
4. Clear browser cache

**Data not syncing?**
1. Check user is authenticated
2. Verify Firestore rules
3. Check network connection
4. Look at Firebase Console

---

## 🚀 Performance Tips

1. **Lazy load pages** - Use React.lazy()
2. **Memoize components** - Use React.memo for lists
3. **Optimize re-renders** - Use useCallback
4. **Monitor bundle size** - Use build analysis
5. **Enable compression** - Gzip on server
6. **Cache assets** - Service workers
7. **Optimize images** - Compress before upload
8. **Pagination** - Don't load all at once

---

## 📚 File Location Cheat Sheet

```
Need to...                          Look in...
─────────────────────────────────────────────────────
Add Firebase config              → src/services/firebase.js
Add auth functionality           → src/context/AuthContext.jsx
Add task functionality           → src/context/TaskContext.jsx
Change colors/theme              → tailwind.config.js
Add global styles                → src/index.css
Add date helpers                 → src/utils/helpers.js
Add constants                    → src/utils/constants.js
Create new page                  → src/pages/[name].jsx
Create new component             → src/components/[type]/[name].jsx
Set up routes                    → src/App.jsx
```

---

## 🎓 Learning Path

1. ✅ Start with `README.md` - Understand the project
2. ✅ Follow `SETUP_GUIDE.md` - Get it running
3. ✅ Check `FILE_STRUCTURE.md` - Know where files are
4. ✅ Read `API_REFERENCE.md` - Learn the APIs
5. ✅ Study existing components - Understand patterns
6. ✅ Build new features - Apply knowledge
7. ✅ Deploy - Share with users

---

## ✨ Pro Tips

💡 **Tip 1:** Use React DevTools to inspect component tree and state

💡 **Tip 2:** Console.log in component render to debug re-renders

💡 **Tip 3:** Use Toast notifications for user feedback

💡 **Tip 4:** Test both light and dark modes

💡 **Tip 5:** Test on mobile-sized viewport

💡 **Tip 6:** Keep functions pure and side-effect free

💡 **Tip 7:** Comments for why, not what

💡 **Tip 8:** Use TypeScript later for better type safety

---

**Happy coding! 🚀**

For more details, see the full documentation files.
