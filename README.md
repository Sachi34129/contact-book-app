# Contact Book App

A full-stack web application for managing contacts. Users can **add, view, edit, delete, and search contacts**. The app is responsive and supports pagination.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
- [Running Locally](#running-locally)  
- [Deployment](#deployment)  
- [API Endpoints](#api-endpoints)  
- [Screenshots](#screenshots)  
- [License](#license)  

---

## Demo

- **Frontend (Vercel):** [https://contact-book-app-zka7.vercel.app/](https://contact-book-app-zka7.vercel.app/)  
- **Backend (Render):** [https://contact-book-app-jk07.onrender.com](https://contact-book-app-jk07.onrender.com)  

---

## Features

- Add new contacts with **name, email, and phone number**.  
- Edit existing contacts.  
- Delete contacts.  
- Search contacts by name, email, or phone.  
- Pagination to navigate through contact list.  
- Responsive UI for mobile and desktop.  

---

## Tech Stack

- **Frontend:** React, Axios, React Icons, CSS  
- **Backend:** Node.js, Express  
- **Database:** SQLite  
- **Deployment:** Vercel (frontend), Render (backend)  

---

## Project Structure

```
contact-book-app/
│
├── backend/
│   ├── index.js          # Express server entry
│   ├── db.js             # SQLite connection
│   ├── routes/
│   │   └── contacts.js   # API routes
│   ├── package.json
│   └── …
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── ContactList.js
│   │   ├── ContactFormModal.js
│   │   ├── Pagination.js
│   │   └── …
│   ├── package.json
│   └── …
│
└── README.md
```

---

## Setup Instructions

1. **Clone the repository:**

```
git clone https://github.com/your-username/contact-book-app.git
cd contact-book-app
```

1. **Backend setup:**

```
cd backend
npm install
```

1. **Frontend setup:**

```
cd ../frontend
npm install
```

---

## Running Locally

1. **Backend:**

```
cd backend
npm run dev
```
API server runs at: http://localhost:5000

2. **Frontend:**

```
cd frontend
npm start
```
Frontend runs at: http://localhost:3000 (with proxy to backend)

---

## Deployment

### Backend (Render)
- Backend deployed on Render: [https://contact-book-app-jk07.onrender.com](https://contact-book-app-jk07.onrender.com)
- Make sure `node_modules` are removed and `package-lock.json` is cleaned before deploying.
- `npm install` on Render will rebuild SQLite binaries for Linux.

### Frontend (Vercel)
- Frontend deployed on Vercel: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- Ensure environment variable `REACT_APP_API_URL=https://contact-book-app-jk07.onrender.com` is set in Vercel Dashboard.

---

## API Endpoints

| Method | Endpoint                 | Description                                     |
|--------|--------------------------|-------------------------------------------------|
| GET    | /contacts?page=&limit=&q= | Get paginated contacts (optional search query) |
| POST   | /contacts                | Add a new contact                               |
| PUT    | /contacts/:id            | Update existing contact                         |
| DELETE | /contacts/:id            | Delete a contact                                |


## Screenshots

<img width="1470" height="715" alt="Screenshot 2025-09-20 at 10 10 44 AM" src="https://github.com/user-attachments/assets/46e55f60-1cc1-4834-a580-c758b3a1cb50" />

<img width="1470" height="710" alt="Screenshot 2025-09-20 at 10 11 15 AM" src="https://github.com/user-attachments/assets/a107e0d6-5bb9-4382-968a-8b415a6f05d8" />
