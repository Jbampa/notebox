# NOTEBOX

A modern full-stack note management application.

Notebox currently focuses on **notes and folders**, with authentication, user profile management, and a clean, responsive UI. Additional features are planned and listed in the roadmap.

---

<img width="1919" height="832" alt="image" src="https://github.com/user-attachments/assets/b0c2e0e7-2719-43f5-941b-7fd1b43616dd" />

---

## CURRENT FEATURES

- User authentication (JWT)
- Create, edit, soft-delete and restore notes
- Folder organization
- Responsive dashboard layout
- User profile management
  - Update name
  - Change password (with current password validation)
  - Upload / remove avatar image
- Secure password hashing (bcrypt)
- Protected routes
- Background job to purge soft-deleted notes
- Modern UI built with Tailwind CSS

---

## PLANNED FEATURES (ROADMAP)

- Numeric **Boxes** feature
  - Configurable numeric boxes
  - Optional **streak** tracking per box
- Email verification on account creation
- Password recovery via email (forgot password)
- Optional account security improvements
- Performance optimizations
- UI/UX refinements

---

## TECH STACK

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios
- Heroicons

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Passport.js
- Zod (validation)
- Multer (file uploads)
- node-cron
- date-fns

---

## PROJECT STRUCTURE

frontend/
- src/
  - pages/
  - components/
  - contexts/
  - services/
  - types/
  - routes/
- vite.config.ts

backend/
- src/
  - modules/
    - auth/
    - user/
    - notes/
    - folders/
  - shared/
    - database/
    - http/
    - utils/
  - jobs/
  - server.ts
- prisma/
- public/images/avatar/

---

## REQUIREMENTS

- Node.js 18+
- npm
- MySQL
- Git

---

## INSTALLATION (DEVELOPMENT)

### Clone the repository

git clone <repository-url>
cd notebox

### Backend

cd backend
npm install
npx prisma migrate dev
npm run dev

### Frontend

cd frontend
npm install
npm run dev

Frontend: http://localhost:5173  
Backend: http://localhost:3000

---

## PRODUCTION

Backend:
npm run build
npm run start

Frontend:
npm run build
npm run preview

---

## STATUS

The project is stable and fully usable for note management.
New features will be added incrementally following the roadmap.

---

## LICENSE

MIT License
