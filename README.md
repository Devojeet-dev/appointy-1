# Appointy

Minimal, secure instructions for running the Appointy doctor-appointment project locally.

## Summary

Appointy is a MERN-stack web application with three roles: patient, doctor, and admin. It provides appointment booking, profile management, and payment integration (Razorpay).

## Quick Start

1. Install dependencies for backend and frontend:

```bash
# from project root
npm install
cd admin && npm install || true
cd frontend && npm install || true
cd backend && npm install || true
```

2. Create environment files (do not commit them):

Create a `.env` file in the `backend` folder with values for:

- `MONGO_URI`
- `JWT_SECRET`
- `RAZORPAY_API_KEY`
- any other provider keys you use

3. Run the app (example):

```bash
# start backend (from backend/)
npm run dev
# start frontend (from frontend/)
npm run dev
```

## Files changed here

- Removed sensitive architecture notes from the repository to avoid accidental exposure.
- Added `.gitignore` to ignore `.env` and `ARCHITECTURE.md`.

If `ARCHITECTURE.md` was previously committed, see the removal steps below.

## Security notes

- Never commit `.env` files or secrets to the repository. Use environment variables or a secret manager in CI/deployment.
- This repository now ignores `.env` files and `ARCHITECTURE.md`.

## How to remove `ARCHITECTURE.md` from the repository (if already committed)

Run the following to remove the file from the index and push the change:

```bash
git rm --cached ARCHITECTURE.md
git commit -m "Remove sensitive architecture file"
git push origin main
```

If you need to purge the file from all history, consider using the `BFG Repo-Cleaner` or `git filter-repo` — this rewrites history and requires force-pushing.

---
