# 📝 Notebox

**Notebox** is a full-stack productivity application designed around the idea of *boxes* — structured containers for notes, data, and personal tracking.

The system already functions as a complete note-taking app and is built to scale into a broader personal organization tool.

---

## ✨ Core Concept: Boxes

The name **Notebox** comes from the idea of organizing information into **boxes**.

### Current boxes
- Notes (text-based content organized in folders)

### Planned boxes (future roadmap)
- **Numeric boxes** (track numbers like money, weight, habits, counters, etc.)
- **Streak-based boxes** (daily consistency tracking)
- **Goal-oriented boxes** (personal development, finance, habits)
- **Visual progress tracking**
- **Statistics & trends over time**

The long-term goal is to allow users to use Notebox as a **personal operating system** for goals, habits, and structured thinking.

---

## ✨ Features (Current)

### 🔐 Authentication
- User registration
- Login with JWT
- Secure password hashing (bcrypt)
- Persistent authentication
- Logout
- Protected routes

### 🗂 Notes & Folders
- Create, rename and delete folders
- Create, edit and delete notes
- Multiple notes per folder
- Autosave note content
- Soft delete (Trash)
- Restore notes from trash
- Permanent deletion

### 🗑 Trash & Automation
- Notes moved to trash instead of immediate deletion
- Automatic cleanup after **30 days**
- Scheduled background job using cron

### 👤 User Profile
- Update name
- Change password (with current password validation)
- Upload avatar image
- Replace existing avatar automatically
- Remove avatar
- Public avatar URL generation

### 🎨 UI / UX
- Fully responsive (mobile / tablet / desktop)
- Modern minimal interface
- Visual feedback for:
  - Saving state
  - Success messages
  - Error messages
- Confirmation modals for destructive actions
- Consistent spacing and color system

---

## 🧰 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router
- Axios
- Heroicons

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- JWT (Passport + passport-jwt)
- Zod (validation)
- Multer (file uploads)
- node-cron
- date-fns

---

## 🗂 Project Structure

```text
/frontend
 ├─ src
 │  ├─ pages
 │  ├─ components
 │  ├─ contexts
 │  ├─ services
 │  ├─ types
 │  └─ routes
 └─ vite.config.ts

/backend
 ├─ src
 │  ├─ modules
 │  │  ├─ auth
 │  │  ├─ user
 │  │  ├─ notes
 │  │  └─ folders
 │  ├─ shared
 │  │  ├─ database
 │  │  ├─ http
 │  │  └─ utils
 │  ├─ jobs
 │  └─ server.ts
 ├─ prisma
 └─ public/images/avatar
```

---

## 📦 Requirements

- Node.js **18+**
- npm
- MySQL
- Git

---

## 🚀 Installation (Development)

### Clone the repository
```bash
git clone <repository-url>
cd notebox
```

### Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
DATABASE_URL=mysql://user:password@localhost:3306/notebox
JWT_SECRET=your_secret_key
PORT=3000
```

Run migrations:
```bash
npx prisma migrate dev
```

Start backend:
```bash
npm run dev
```

Backend runs at:
```
http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 📜 Available Scripts

### Frontend
- `npm run dev`
- `npm run build`
- `npm run preview`

### Backend
- `npm run dev`
- `npm run build`
- `npm start`

---

## 🔐 Security & Best Practices

- Passwords hashed with bcrypt
- JWT authentication
- Request validation with Zod
- Multer file validation
- Safe avatar replacement & deletion
- Soft delete to avoid data loss
- Background jobs for cleanup

---

## 🗃 Git & Version Control

Ignored files:
- `node_modules`
- `.env`
- `public/images/avatar/*`

A `.gitkeep` file is used to preserve empty directories.

---

## 🛣 Roadmap

Planned features:
- Email verification
- Forgot password flow
- Password reset via email
- Numeric boxes
- Streak tracking
- Habit & goal tracking
- Analytics & trends
- Note sharing
- Search & filtering

---

## 📌 Project Status

✅ Fully functional MVP  
🚧 Actively evolving  
🧱 Built with scalability and maintainability in mind

---

## 👨‍💻 Author

Developed by **JBampa**
