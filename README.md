NOTEXBOX
A full-stack note-taking application with authentication, folders, soft delete, user profiles and scheduled cleanup.

────────────────────────────────────────
OVERVIEW
────────────────────────────────────────

Notebox is a full-stack web application designed to manage notes in a clean, modern and efficient way.  
It supports user authentication, folders, multiple notes per folder, soft deletion with trash recovery,
automatic cleanup jobs, and user profile management (avatar, name and password).

This project was built as a real-world production-style application, focusing on:
- Clear architecture
- Strong typing
- Proper validation
- Clean UI/UX
- Scalable backend logic

The application is fully usable today as a personal notes app and will continue to evolve with additional features.

────────────────────────────────────────
FEATURES
────────────────────────────────────────

AUTHENTICATION
- User registration
- Login with JWT authentication
- Secure password hashing (bcrypt)
- Persistent authentication via local storage
- Logout
- Protected routes

NOTES & FOLDERS
- Create folders
- Create, edit and delete notes
- Multiple notes per folder
- Autosave notes content
- Soft delete (move to trash)
- Restore notes from trash
- Permanent deletion
- Trash view

AUTOMATION
- Scheduled job to permanently delete notes after 30 days in trash
- Cron-based cleanup using node-cron

USER PROFILE
- Update name
- Change password (with current password verification)
- Upload avatar image
- Replace existing avatar automatically
- Remove avatar
- Public avatar URL generation

UI / UX
- Fully responsive layout (mobile, tablet, desktop)
- Modern minimal design
- Visual feedback for:
  - Saving state
  - Success messages
  - Error messages
- Confirmation modal for destructive actions
- Consistent color palette and spacing

────────────────────────────────────────
TECH STACK
────────────────────────────────────────

FRONTEND
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router
- Axios
- Heroicons

BACKEND
- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Passport + passport-jwt
- Zod validation
- Multer (file uploads)
- node-cron
- date-fns

────────────────────────────────────────
PROJECT STRUCTURE
────────────────────────────────────────

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
  │  │  ├─ folders
  │  ├─ shared
  │  │  ├─ database
  │  │  ├─ http
  │  │  ├─ utils
  │  ├─ jobs
  │  └─ server.ts
  ├─ prisma
  └─ public/images/avatar

────────────────────────────────────────
REQUIREMENTS
────────────────────────────────────────

- Node.js 18+
- npm
- MySQL
- Git

────────────────────────────────────────
INSTALLATION (DEVELOPMENT)
────────────────────────────────────────

CLONE THE REPOSITORY
git clone <repository-url>
cd notebox

──────────────────
BACKEND SETUP
──────────────────

cd backend
npm install

Create a `.env` file based on your environment:
DATABASE_URL=
JWT_SECRET=
PORT=3000

Run database migrations:
npx prisma migrate dev

Start backend in development mode:
npm run dev

Backend will be available at:
http://localhost:3000

──────────────────
FRONTEND SETUP
──────────────────

cd frontend
npm install
npm run dev

Frontend will be available at:
http://localhost:5173

────────────────────────────────────────
SCRIPTS
────────────────────────────────────────

FRONTEND
- npm run dev       → start development server
- npm run build     → build production bundle
- npm run preview   → preview production build

BACKEND
- npm run dev       → start backend in watch mode
- npm run build     → compile TypeScript
- npm start         → run compiled production build

────────────────────────────────────────
ENVIRONMENT VARIABLES
────────────────────────────────────────

BACKEND
DATABASE_URL=mysql://user:password@localhost:3306/notebox
JWT_SECRET=your_secret_key
PORT=3000

────────────────────────────────────────
SECURITY & BEST PRACTICES
────────────────────────────────────────

- Passwords are hashed using bcrypt
- JWT authentication with protected routes
- Zod validation on request payloads
- Multer validation for image uploads
- File system cleanup on avatar replacement
- Soft delete strategy to prevent data loss
- Scheduled background jobs for cleanup
- Public assets separated from source code
- Uploaded images excluded from Git versioning

────────────────────────────────────────
GIT & VERSION CONTROL
────────────────────────────────────────

Ignored files:
- node_modules
- .env
- public/images/avatar/*

A `.gitkeep` file is used to preserve empty directories.

────────────────────────────────────────
ROADMAP (PLANNED FEATURES)
────────────────────────────────────────

- Email verification after registration
- Forgot password flow
- Password reset via email
- Email notifications
- User preferences
- Note sharing
- Improved search and filtering
- Rate limiting and security hardening

────────────────────────────────────────
PROJECT STATUS
────────────────────────────────────────

This project is actively maintained and fully functional.
New features are planned and will be added incrementally.

The current version is considered a solid MVP.

────────────────────────────────────────
AUTHOR
────────────────────────────────────────

Developed by JBampa
