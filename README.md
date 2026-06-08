# Appointy

A full-stack doctor appointment booking application built with the MERN stack.

## What is Appointy?

Appointy allows patients to browse doctors, book appointments, and manage their profile. Doctors can view and update schedules, while admins can manage doctors and appointments.

This repository uses a single branch: `main`.

## Highlights

- Patient, doctor, and admin roles
- Appointment booking and management
- Profile editing and dashboard views
- Razorpay payment support
- Secure JWT-based authentication

## Technologies

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Payment: Razorpay
- Authentication: JWT

## Quick start

1. Install dependencies:

```bash
npm install
cd admin && npm install
cd frontend && npm install
cd backend && npm install
```

2. Create the backend environment file:

Create `backend/.env` with your values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_API_KEY=your_razorpay_api_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin-password
```

3. Start the application:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

If you are using the admin panel:

```bash
cd admin
npm run dev
```

## Repository structure

- `backend/` – Express server, API routes, models, and configuration
- `frontend/` – Customer-facing React application
- `admin/` – Admin dashboard React application

## Security reminder

- Do not commit `.env` files to GitHub.
- This repository ignores `.env` files in `.gitignore`.
- If sensitive files were previously committed, remove them from git history before pushing.

## Notes for GitHub visitors

This repo is intended for local development and review. Clone it, add your own environment config, and run the backend and frontend separately.
