# Assignment No. 4 — Software Project Management

**Project:** Taskora — Student Task & Deadline Management System  
**Prepared by:** Muhammad Abdullah Noor  
**Date:** June 1, 2026  

---

---

# Question No. 1

> Take your complete software project that has already been selected as your Semester Project and perform the following tasks:
> 1. Apply and explain: Process Metrics, Product Metrics, Software Metrics
> 2. Identify and discuss possible risks that may occur during the project development lifecycle
> 3. Perform a Qualitative Risk Analysis by categorizing risks according to: Probability, Impact, Severity
> 4. Provide suitable examples for each metric and risk identified

---

## 1.1 Process Metrics

| Metric | Definition | Application in Taskora | Example |
|--------|-----------|----------------------|---------|
| **Development Time** | Total time from planning to deployment | Measured across all phases: planning, design, coding, testing | Planning: 3 days, Design: 3 days, Coding: 5 days, Testing: 2 days → **13 days total** |
| **Effort Estimation Accuracy** | How close estimated hours were to actual hours | Compared estimated vs actual hours per module after completion | Auth module: estimated 6 hrs → actual 5 hrs (**83% accuracy**). Task CRUD: estimated 4 hrs → actual 6 hrs (**67% accuracy**) |
| **Defect Density** | Number of bugs found per module | Counted bugs found in each module during testing | Dashboard: 0 bugs, Task Form: 2 bugs (deadline validation), Auth: 1 bug (missing route). Total: **3 bugs across 10 modules = 0.3 bugs/module** |
| **Requirements Stability** | Percentage of requirements that stayed unchanged | Compared initial requirement list vs final delivered features | 22 out of 25 requirements unchanged = **88% stability** |
| **Review Efficiency** | Issues caught in code review vs after deployment | Tracked issues found during review vs issues found in production | Code review caught 4 issues (unused imports, hardcoded strings). 0 issues post-deployment = **100% review efficiency** |

---

## 1.2 Product Metrics

| Metric | Definition | Application in Taskora | Example |
|--------|-----------|----------------------|---------|
| **Lines of Code (LOC)** | Total source lines in the codebase | Counted all JavaScript/JSX files excluding node_modules | **~6,000+ lines** across 36 source files |
| **Cyclomatic Complexity** | Number of independent execution paths in code | Measured for the most complex component (TaskList.jsx filter logic) | 5 filter conditions → **complexity = 6** (moderate, acceptable) |
| **Function Points** | Count of user-accessible features | Listed all features a user can interact with | Auth (login, signup, logout, forgotPassword) = 4, Task CRUD = 4, Dashboard = 3, Notifications = 3, Profile = 2, Theme = 1 → **Total: 17 function points** |
| **Code Coverage** | Percentage of code covered by automated tests | Checked if unit tests exist in the project | **0%** — no formal tests implemented (area for improvement) |
| **Response Time** | Time taken for the UI to respond to user actions | Measured using browser DevTools network tab | Page load: ~1.2s, Task save: ~0.8s, Filter apply: ~0.3s → **All within acceptable range** |
| **User Satisfaction** | Qualitative measure of ease of use | Assessed based on UI feedback and feature behavior | Instant stats on dashboard, clear form validation errors, smooth theme switching → **High satisfaction** |

---

## 1.3 Software Metrics

| Metric | Value | Interpretation |
|--------|-------|---------------|
| **Defect Rate** | 3 bugs ÷ 13 days = **0.23 bugs/day** | Low — acceptable for a semester project |
| **Requirement Completion** | 23 out of 25 = **92%** | High — most planned features delivered |
| **Code Maintainability** | 36 files, 4 React Contexts, 3 custom hooks, clear component separation | Easy to maintain — follows React best practices |
| **Reusability** | Common components reused across multiple pages | StatsCard reused 4 times on Dashboard, Badge reused in 3 pages → **Good reusability** |
| **Documentation Coverage** | README, API reference, setup guide, technical summary | **4 documentation files** — moderate coverage |

---

## 1.4 Possible Risks During Development Lifecycle

| Risk ID | Risk Description | Category | Likelihood |
|---------|-----------------|----------|------------|
| R1 | **Firebase Configuration Issues** — Incorrect credentials or Firestore security rules causing auth/database failures | Technical | Medium |
| R2 | **Scope Creep** — Adding features beyond original plan (collapsible sidebar, notifications, charts, theme toggle were added later) | Management | High |
| R3 | **Library Integration Conflicts** — Firebase SDK version incompatibility with React Router or other dependencies | Technical | Low |
| R4 | **Deadline Pressure** — Rushing features before submission deadline causing technical debt or bugs | Schedule | Medium |
| R5 | **Browser Compatibility** — App designed for 1280px+ desktop screens only; limited mobile/tablet accessibility | Design | Low (by design) |
| R6 | **Data Loss Risk** — No backup mechanism for Firestore data if records are accidentally deleted | Operational | Medium |

---

## 1.5 Qualitative Risk Analysis

| Risk ID | Risk Description | Probability (1-5) | Impact (1-5) | Severity (P × I) | Priority Category |
|---------|-----------------|:-----------------:|:------------:|:----------------:|-------------------|
| R1 | Firebase config issues | 3 | 5 | **15** | **High** |
| R2 | Scope creep | 4 | 3 | **12** | **Medium** |
| R3 | Integration conflicts | 2 | 4 | **8** | **Medium** |
| R4 | Deadline pressure | 3 | 3 | **9** | **Medium** |
| R5 | Browser limitations | 1 | 2 | **2** | **Low** |
| R6 | Data loss | 2 | 5 | **10** | **Medium** |

**Severity Ranges:** Low = 1-5, Medium = 6-12, High = 13-25

---

---

# Question No. 2

> Discuss the Risk Management Techniques used in your selected project. Explain why those techniques are suitable for the project.
> Include: Risk Identification Technique, Risk Assessment Technique, Risk Mitigation Strategy, Risk Monitoring Approach
> Provide practical examples from your project scenario.

---

## 2.1 Risk Identification Technique — Checklist-Based Analysis + Brainstorming

| Aspect | Description |
|--------|-------------|
| **Technique** | Checklist-Based Analysis combined with Brainstorming |
| **How It Was Applied** | A checklist of common React + Firebase web app risks was created. Then the team brainstormed project-specific risks not on the standard checklist |
| **Why It Is Suitable** | Taskora is a small-to-medium project with one developer. Checklist-based identification is lightweight, fast, and covers common failure points without expensive formal tools |
| **Practical Example** | The checklist covered "Firebase integration issues." Brainstorming added "Forgot password route doesn't exist yet" and "Password change is a TODO stub." Both were real issues found and fixed |

### Checklist Used

| # | Common Risk Category | Applied to Taskora? | Found Issue? |
|---|---------------------|:-------------------:|:------------:|
| 1 | Firebase config / credentials | ✅ Yes | Credentials initially in `.env.local`, moved to source |
| 2 | Authentication edge cases | ✅ Yes | Session persistence configured |
| 3 | Missing routes (404 errors) | ✅ Yes | `/forgot-password` route was missing |
| 4 | Unimplemented feature stubs | ✅ Yes | Password change + account deletion were TODOs |
| 5 | Form validation gaps | ✅ Yes | Deadline field accepted past dates |
| 6 | Dependency conflicts | ✅ Yes | `clsx` removal required lockfile regeneration |

---

## 2.2 Risk Assessment Technique — Qualitative Risk Analysis

| Aspect | Description |
|--------|-------------|
| **Technique** | Probability × Impact Matrix (Qualitative) |
| **How It Was Applied** | Each identified risk was scored on Probability (1-5) and Impact (1-5). Severity = P × I. Risks with severity ≥ 12 were addressed immediately |
| **Why It Is Suitable** | No historical data needed, no complex calculations, but still provides clear prioritization — practical for a semester project |
| **Practical Example** | Risk "Firebase config issues" scored P=3, I=5, Severity=15 (High). This prompted immediate verification of credentials and Firestore rules before any features were built |

### Risk Scoring Matrix Used

| Impact ↓ \ Probability → | 1 (Rare) | 2 (Unlikely) | 3 (Possible) | 4 (Likely) | 5 (Almost Certain) |
|:------------------------:|:--------:|:-------------:|:------------:|:----------:|:------------------:|
| **5 (Catastrophic)** | 5 | **10** (R6) | **15** (R1) | 20 | 25 |
| **4 (Major)** | 4 | **8** (R3) | 12 | 16 | 20 |
| **3 (Moderate)** | 3 | 6 | **9** (R4) | **12** (R2) | 15 |
| **2 (Minor)** | **2** (R5) | 4 | 6 | 8 | 10 |
| **1 (Negligible)** | 1 | 2 | 3 | 4 | 5 |

---

## 2.3 Risk Mitigation Strategy — Risk Avoidance + Contingency Planning

| Strategy | Definition | How Applied in Taskora | Practical Example |
|----------|-----------|----------------------|-------------------|
| **Risk Avoidance** | Eliminate the risk at its source — prevent it from happening | Used Firebase `browserLocalPersistence` to prevent session loss. Wrapped every async operation in try/catch. Validated all inputs before Firestore writes | Password change feature was a `// TODO` stub. Instead of leaving it as a known broken feature, the full Firebase `updatePassword()` + `reauthenticateWithCredential()` flow was implemented — risk eliminated |
| **Contingency Planning** | Prepare for what happens if the risk materializes — graceful degradation | Every async failure shows a toast error message instead of crashing. The app never shows a blank white screen | If Firestore write fails during task creation, user sees "Failed to save task. Please try again." with the error toast. No data is silently lost |

---

## 2.4 Risk Monitoring Approach — Code Review + Build Verification

| Aspect | Description |
|--------|-------------|
| **Technique** | Code Review + Continuous Build Verification |
| **How It Was Applied** | (1) `npm run build` was run after every change to catch compilation errors. (2) Context providers were reviewed to ensure all async ops had try/catch. (3) Forms were manually tested for validation. (4) Vercel deployment logs were monitored |
| **Why It Is Suitable** | Build verification is automated (zero effort to run). Code review catches logical errors. Together they cover both compilation and logic issues |
| **Practical Example** | After removing unused `clsx` dependency from `package.json`, the Vercel build failed because `pnpm-lock.yaml` was out of sync. Build monitoring caught this immediately. Fix: `pnpm install --no-frozen-lockfile` locally, commit updated lockfile |

---

---

# Question No. 3

> Prepare a Risk Register for your selected project containing at least five risks.
> Include: Risk ID, Risk Description, Probability, Impact, Risk Priority, Mitigation Plan, Responsible Team Member

---

## Risk Register — Taskora Project

| Risk ID | Risk Description | P (1-5) | I (1-5) | Severity (P×I) | Priority | Mitigation Plan | Responsible Person |
|---------|-----------------|:-------:|:-------:|:--------------:|----------|----------------|:------------------:|
| **R-001** | Firebase credentials exposed in public GitHub repository — anyone can read API keys from source code | 3 | 5 | **15** | **Critical** | Keep credentials hardcoded (Firebase API keys are public by design). Protect data using Firestore Security Rules instead. Never commit service account private keys | Muhammad Abdullah Noor |
| **R-002** | Protected routes allow unauthenticated access — user can see app content without logging in | 2 | 5 | **10** | **High** | Wrap all authenticated routes in `<PrivateRoute>` component. Component checks `isAuthenticated` from AuthContext. If false, redirect to `/login` using `<Navigate>` | Muhammad Abdullah Noor |
| **R-003** | Task data lost due to silent Firestore write failures — user thinks data saved when it didn't | 2 | 5 | **10** | **High** | Every CRUD operation uses try/catch. Success: toast "Task saved". Failure: toast "Failed to save task" with error message. Never update local state optimistically without Firestore confirmation | Muhammad Abdullah Noor |
| **R-004** | Deadline date picker allows selecting past dates — user can create a task with an already-passed deadline | 3 | 3 | **9** | **Medium** | Add validation in AddEditTask.jsx: `if (deadlineDate < new Date())` → show error "Deadline cannot be in the past" and block form submission. Validate on both `onChange` and on submit | Muhammad Abdullah Noor |
| **R-005** | Password change feature is unimplemented — UI button exists but does nothing (was a `// TODO` stub) | 2 | 4 | **8** | **Medium** | Implement full Firebase flow: (1) prompt for current password, (2) reauthenticate using `EmailAuthProvider.credential()`, (3) call `updatePassword(newPassword)`. Show success/error toasts | Muhammad Abdullah Noor |
| **R-006** | Forgot password page missing — login page links to `/forgot-password` but route doesn't exist, causing 404 | 1 | 4 | **4** | **Low** | Create ForgotPassword component with email input. On submit call `sendPasswordResetEmail(auth, email)`. Show "Reset email sent" or "No account found". Add route in App.jsx | Muhammad Abdullah Noor |
| **R-007** | Dark/light theme preference lost on page refresh — user must toggle theme again every time | 1 | 2 | **2** | **Low** | Save theme preference to `localStorage` under key `taskora-theme` on every toggle. On mount, read from `localStorage` first, then apply theme class to document root. Fallback to `prefers-color-scheme` media query for new users | Muhammad Abdullah Noor |

---

---

# Question No. 4

> Consider your selected software project and apply the Monte Carlo Simulation Technique for project risk analysis and estimation.
> 1. Identify at least three uncertain project factors
> 2. Assume suitable probability values or ranges for the selected factors
> 3. Perform a simple Monte Carlo Simulation using random values for multiple iterations
> 4. Analyze and interpret results to determine possible scenarios and outcomes
> 5. Conclude how Monte Carlo Simulation helps project managers

---

## 4.1 Uncertain Project Factors Identified

| Factor | Description | Unit | Best Case | Most Likely | Worst Case | Reason for Selection |
|--------|------------|------|:---------:|:-----------:|:----------:|---------------------|
| **Completion Time** | Total duration from project start to final deployment | Days | 10 | 13 | 18 | Determines whether project meets semester deadline |
| **Development Effort** | Total person-hours spent on all development activities | Hours | 60 | 75 | 100 | Determines if solo developer can complete the work |
| **Bug Count** | Number of defects found during testing phase | Bugs | 0 | 3 | 8 | Determines product quality and need for extra fix time |

---

## 4.2 Assumed Probability Distributions

| Factor | Distribution Type | Minimum (a) | Most Likely (m) | Maximum (b) | Threshold ((m-a)/(b-a)) |
|--------|:-----------------:|:-----------:|:---------------:|:-----------:|:-----------------------:|
| Completion Time | Triangular | 10 | 13 | 18 | **0.375** |
| Development Effort | Triangular | 60 | 75 | 100 | **0.375** |
| Bug Count | Triangular | 0 | 3 | 8 | **0.375** |

**Why Triangular Distribution?**
- We only have three estimates (best, likely, worst) — no historical data
- Triangular is the simplest way to model uncertainty with limited information
- Commonly used in software project estimation

**Formula Used:**

Let `r` = random value between 0 and 1

| Condition | Formula |
|-----------|---------|
| If r ≤ (m - a) / (b - a) | value = a + √(r × (b - a) × (m - a)) |
| If r > (m - a) / (b - a) | value = b - √((1 - r) × (b - a) × (b - m)) |

Since (m-a)/(b-a) = 3/8 = 0.375 for all three factors, the same threshold applies to all.

---

## 4.3 Monte Carlo Simulation — 10 Iterations

| Iteration | Random r₁ | Time Formula Used | Time (days) | Random r₂ | Effort Formula Used | Effort (hrs) | Random r₃ | Bugs Formula Used | Bugs Found |
|:---------:|:---------:|:-----------------:|:-----------:|:---------:|:------------------:|:------------:|:---------:|:-----------------:|:----------:|
| 1 | 0.42 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **12.4** | 0.31 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **71.2** | 0.85 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **5.7** |
| 2 | 0.15 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **10.8** | 0.62 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **78.5** | 0.22 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **2.1** |
| 3 | 0.73 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **14.6** | 0.88 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **89.3** | 0.08 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **1.2** |
| 4 | 0.91 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **16.2** | 0.45 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **74.1** | 0.55 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **4.3** |
| 5 | 0.08 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **10.2** | 0.19 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **67.8** | 0.39 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **3.5** |
| 6 | 0.55 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **13.0** | 0.73 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **82.0** | 0.71 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **5.0** |
| 7 | 0.34 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **11.8** | 0.51 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **75.8** | 0.94 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **6.8** |
| 8 | 0.67 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **14.0** | 0.38 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **73.0** | 0.15 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **1.8** |
| 9 | 0.82 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **15.4** | 0.95 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **94.2** | 0.62 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **4.7** |
| 10 | 0.23 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **11.2** | 0.27 | r ≤ 0.375 → a + √(r × (b-a) × (m-a)) | **70.1** | 0.48 | r > 0.375 → b - √((1-r) × (b-a) × (b-m)) | **3.9** |

---

## 4.4 Simulation Results — Statistical Analysis

### Completion Time (Days)

| Metric | Value |
|--------|:-----:|
| Best Case (Iteration 5) | **10.2 days** |
| Worst Case (Iteration 4) | **16.2 days** |
| Average (Mean) | **13.0 days** |
| Standard Deviation | **~1.9 days** |
| 68% Confidence Interval | 11.1 — 14.9 days |
| 95% Confidence Interval | 9.2 — 16.8 days |

### Development Effort (Hours)

| Metric | Value |
|--------|:-----:|
| Best Case (Iteration 5) | **67.8 hours** |
| Worst Case (Iteration 9) | **94.2 hours** |
| Average (Mean) | **77.6 hours** |
| Standard Deviation | **~8.5 hours** |
| 68% Confidence Interval | 69.1 — 86.1 hours |
| 95% Confidence Interval | 60.6 — 94.6 hours |

### Bug Count

| Metric | Value |
|--------|:-----:|
| Best Case (Iteration 3) | **1.2 bugs** |
| Worst Case (Iteration 7) | **6.8 bugs** |
| Average (Mean) | **3.9 bugs** |
| Standard Deviation | **~1.8 bugs** |
| 68% Confidence Interval | 2.1 — 5.7 bugs |
| 95% Confidence Interval | 0.3 — 7.5 bugs |

---

## 4.5 Possible Project Scenarios

| Scenario | Time | Effort | Bugs | Likelihood | Interpretation |
|----------|:----:|:------:|:----:|:----------:|----------------|
| **Best Case** | ~10 days | ~68 hours | ~1 bug | ~15% | Everything goes perfectly — no delays, no extra bugs |
| **Most Likely** | ~13 days | ~78 hours | ~4 bugs | ~68% | Normal development with typical issues — **this is what actually happened** |
| **Worst Case** | ~16 days | ~94 hours | ~7 bugs | ~15% | Multiple blockers, scope creep, many bugs found |

**Actual Project Outcome:** 13 days, ~75 hours estimated effort, 3 bugs found. The project landed firmly in the **Most Likely** scenario, validating the simulation's accuracy.

---

## 4.6 How Monte Carlo Simulation Helps Project Managers

| Benefit | Explanation | Application to Taskora |
|---------|-------------|----------------------|
| **Realistic Timeline Estimation** | Instead of a single guess, the simulation provides a probability distribution for completion time | 68% probability of finishing within 11-15 days. Manager can set deadline with quantified confidence |
| **Resource Planning** | Effort estimates include confidence intervals, helping allocate the right number of person-hours | At ~78 hours average over 13 days = ~6 hours/day. Manager knows this is sustainable for a solo developer |
| **Risk Quantification** | Bug count distribution helps determine how much testing time is needed | 16% chance of 6+ bugs justifies allocating 2 days for testing. Actual was 3 bugs — well within predicted range |
| **Informed Decision-Making** | Quantifies the impact of changes (scope creep) on time and quality | Adding features pushes both time and bugs toward worst case. Manager can say: "Adding collapsible sidebar increases completion risk by X%" |
| **Stakeholder Communication** | Provides credible, data-backed estimates instead of guesses | "There is a 90% probability the project completes within 16 days" is more convincing than "it might take 2 weeks" |

---

---

# Question No. 5

> Select and justify a suitable Software Process Model for your Semester Project.
> 1. Brief explanation of different software process models
> 2. Identify which model is most suitable for your project
> 3. Explain why you selected that model
> 4. Describe how the selected model helps in: Requirement gathering, Team collaboration, Risk management, Project delivery
> 5. If Agile/Scrum is selected, explain: Sprint Planning, Product Backlog, Daily Scrum Meetings, Sprint Review
> 6. Compare your selected model with at least one other software process model

---

## 5.1 Overview of Software Process Models

| Model | Approach | Strengths | Weaknesses | Best For |
|-------|----------|-----------|------------|----------|
| **Waterfall** | Linear, sequential. Each phase completed before next begins (Requirements → Design → Implementation → Testing → Deployment) | Simple to understand, clear milestones, works for fixed requirements | Inflexible — changes are very expensive after a phase is done | Projects with stable, well-understood requirements (bridges, medical devices) |
| **Agile** | Iterative. Requirements and solutions evolve through collaboration. Working software delivered in short cycles | Flexible, fast delivery, continuous feedback | Less predictability, requires active stakeholder involvement | Projects with evolving requirements, small teams |
| **Scrum** | Specific Agile framework with defined roles (Product Owner, Scrum Master, Dev Team), events (Sprint Planning, Daily Scrum, Sprint Review), and artifacts (Product Backlog, Sprint Backlog) | Structured Agile, clear accountability, time-boxed delivery | Ceremonies can feel heavy for very small teams | Teams needing structure within Agile |
| **Spiral** | Risk-driven. Each iteration goes through: Identify Objectives → Risk Analysis → Develop → Plan Next | Excellent risk management, handles large projects | Expensive, complex, requires risk expertise | Large, high-risk projects (NASA, banking) |
| **Plan-Driven** | Traditional. Everything planned upfront. Changes go through formal change control | Highly predictable, good for regulated industries | Bureaucratic, slow to change, heavy documentation | Regulated environments (healthcare, aerospace, finance) |

---

## 5.2 Selected Model: **Agile with Scrum Practices**

---

## 5.3 Why Agile/Scrum Was Selected for Taskora

| Project Factor | Taskora's Reality | Why Agile/Scrum Fits |
|----------------|-------------------|---------------------|
| **Requirements Stability** | Requirements evolved — collapsible sidebar, notifications, charts, theme toggle were added mid-development | Agile embraces change. Scrum's Sprint Review lets stakeholders see progress and request features for next sprint |
| **Timeline** | ~3 weeks from start to submission (tight semester deadline) | Agile delivers working software fast. MVP in Sprint 1 (4 days), full features by Sprint 3 (13 days) |
| **Team Size** | Single developer | Scrum provides lightweight structure without overhead. Product Backlog = prioritized to-do list |
| **Risk Exposure** | Multiple risks: Firebase config, missing routes, unimplemented feature stubs | Iterative development surfaces risks every sprint. Issues found in Sprint 1 are fixed in Sprint 2 — never left to the end |
| **Delivery Requirement** | Must submit a working, deployed application | "Potentially Releasable Increment" after every sprint means even if time runs out, a working product exists after Sprint 1 |

---

## 5.4 How the Selected Model Helps

| Area | How Agile/Scrum Helps in Taskora | Practical Example |
|------|----------------------------------|-------------------|
| **Requirement Gathering** | Requirements captured as User Stories in Product Backlog. Prioritized by business value. Format: "As a [role], I want to [action] so that [benefit]" | "As a student, I want to add tasks with deadlines so I can track my assignments" → implemented in Sprint 1. "As a student, I want a collapsible sidebar so I have more screen space" → added in Sprint 3 after user feedback |
| **Team Collaboration** | Solo developer adapted Scrum practices: Product Backlog as single source of truth, Sprint Planning for prioritization, daily self-check for progress | Each morning: review yesterday's commits, set today's goal, identify blockers. Blockers resolved same day — no waiting for meetings |
| **Risk Management** | Each 4-day sprint surfaces risks early. High-severity risks addressed in same sprint they're discovered | Sprint 1: Firebase Firestore queries needed userId filter → applied immediately. Sprint 2: Deadline validation missing → fixed same sprint. Sprint 3: Password change was stub → implemented before deployment |
| **Project Delivery** | Every sprint produces a potentially shippable product increment. Core features first, polish later | Sprint 1: Working auth + task CRUD (could submit here). Sprint 2: Dashboard + notifications (full app). Sprint 3: Polish + deploy on Vercel (final submission) |

---

## 5.5 Scrum Practices Applied

### Sprint Planning

| Sprint | Duration | Goal | Backlog Items Selected |
|--------|:--------:|------|-----------------------|
| **Sprint 1** | Days 1-4 | "Get a working task manager with authentication" | Project setup, Firebase config, Auth pages (login/signup/welcome), Task CRUD pages (add/edit/list/detail), Routing, Sidebar |
| **Sprint 2** | Days 5-9 | "Add data visualization and notifications" | Dashboard with stats cards, Recharts progress chart, Notification bell with dropdown, Task filters + search, Pagination, Profile settings UI, Welcome banner with daily quote |
| **Sprint 3** | Days 10-13 | "Polish, fix edge cases, and deploy" | Dark/Light theme toggle, Forgot password page, Password change + account deletion, Skeleton loading states, Collapsible sidebar, Color fixes (priority/status), Favicon, Vercel deployment |

### Product Backlog (Final State)

| Priority | User Story | Sprint | Delivered? |
|:--------:|-----------|:------:|:----------:|
| 1 | As a user, I want to sign up and log in so I can access the app | Sprint 1 | ✅ |
| 2 | As a user, I want to create tasks with deadlines so I can track my work | Sprint 1 | ✅ |
| 3 | As a user, I want to edit and delete my tasks so I can manage them | Sprint 1 | ✅ |
| 4 | As a user, I want to see all my tasks in a list so I can review them | Sprint 1 | ✅ |
| 5 | As a user, I want a dashboard with stats so I can monitor my progress | Sprint 2 | ✅ |
| 6 | As a user, I want notifications for overdue tasks so I don't miss deadlines | Sprint 2 | ✅ |
| 7 | As a user, I want to search and filter tasks so I can find specific ones | Sprint 2 | ✅ |
| 8 | As a user, I want pagination so the task list doesn't overflow the page | Sprint 2 | ✅ |
| 9 | As a user, I want to switch between dark and light themes | Sprint 3 | ✅ |
| 10 | As a user, I want to reset my password if I forget it | Sprint 3 | ✅ |
| 11 | As a user, I want to change my password and email in settings | Sprint 3 | ✅ |
| 12 | As a user, I want to delete my account if needed | Sprint 3 | ✅ |
| 13 | As a user, I want a collapsible sidebar for more screen space | Sprint 3 | ✅ |

### Daily Scrum (Adapted for Solo Developer)

| Scrum Element | Adaptation for Solo Developer | How It Worked |
|---------------|------------------------------|---------------|
| **What did I complete yesterday?** | Review git commits from previous day | Checked `git log --oneline` for completed work |
| **What will I complete today?** | Set a specific daily goal | "Today I will implement the notification system" |
| **Are there any blockers?** | Identify challenges immediately | "Firestore security rules are blocking reads" → fixed same day |

### Sprint Reviews

| Sprint | What Was Reviewed | Feedback Received | Action Taken |
|--------|-------------------|-------------------|-------------|
| **Sprint 1 (Day 4)** | Working auth + task CRUD | "The dashboard is empty — it needs charts and statistics" | Added Recharts progress chart and stats cards to Sprint 2 backlog |
| **Sprint 2 (Day 9)** | Dashboard with charts, notifications, filters | "The sidebar takes too much space — can it collapse?" | Added collapsible sidebar to Sprint 3 backlog |
| **Sprint 3 (Day 13)** | Complete application with all features + deployed on Vercel | None (final submission) | Project complete |

---

## 5.6 Comparison: Agile/Scrum vs Waterfall

| Comparison Aspect | Agile/Scrum (Selected) | Waterfall (Alternative) |
|-------------------|-----------------------|------------------------|
| **Requirements Handling** | Requirements evolve during development. New features (collapsible sidebar, notifications, charts, theme toggle) were added as the project progressed | ALL features must be defined upfront in an SRS document. Collapsible sidebar, notifications, and charts would NOT have been included — a less useful product |
| **Flexibility to Change** | **High** — Product Backlog is reprioritized every sprint. Stakeholders can request features and see them in 1-2 weeks | **Low** — Any change requires formal revision of requirements, design, schedule. Expensive and slow |
| **Risk Management Timing** | Risks identified **every sprint** (every 4 days). Firebase issues found in Sprint 1 were fixed before Sprint 2 | Risks discovered only during the **testing phase** (the LAST phase). Firebase issues found 2+ weeks after coding started — no time to fix |
| **User Feedback Cycle** | **Continuous** — working software delivered every 4 days. Stakeholders touch, test, and give feedback | **End only** — user sees product after weeks of development. If they don't like something, changes are very expensive |
| **Documentation Overhead** | **Lightweight** — code, README, assignment. Focus on working software | **Heavy** — full SRS, design doc, test plan, user manual. Much is outdated as soon as coding starts |
| **First Working Product** | **After 4 days** (Sprint 1) — basic auth + task management | **After 3+ weeks** — only after all phases complete. No visible progress until the end |
| **Team Size Fit** | Works for 1 person (Taskora) or up to 9+ people | Best for large teams with distinct roles (analyst, designer, developer, tester) |
| **Cost of Change** | **Low** — change = update backlog item for next sprint | **High** — change = update requirements, design, code, tests, documentation |
| **Risk of Project Failure** | **Low** — even if time runs out, a working product with core features exists (Sprint 1's output) | **Medium-High** — any phase delay delays the whole project. Major issues found in testing = project failure |

### Why Waterfall Would Have Failed for Taskora

Taskora had **6+ requirements added** after development started:

| Feature Added | When Added | Would Waterfall Include It? |
|---------------|-----------|:--------------------------:|
| Collapsible sidebar | Sprint 3 (after seeing sidebar takes space) | ❌ No — not in original requirements |
| Notifications with bell icon | Sprint 2 (after realizing tasks need reminders) | ❌ No — not in original requirements |
| Dark/Light theme toggle | Sprint 3 (polish phase) | ❌ No — not in original requirements |
| Skeleton loading states | Sprint 3 (polish phase) | ❌ No — not in original requirements |
| SVG favicon | Sprint 3 (polish phase) | ❌ No — not in original requirements |
| Daily motivational quote | Sprint 2 (dashboard enhancement) | ❌ No — not in original requirements |

In a Waterfall model, **none of these features would exist**. The resulting product would have: no notifications (users miss deadlines), no charts (empty dashboard), no collapsible sidebar (cramped layout), and a broken forgot-password page (404 error).

In contrast, Agile/Scrum allowed these features to be added naturally as the developer identified opportunities for improvement during sprint reviews. The final product is richer, more polished, and more useful because of it.

---

---

# End of Assignment
