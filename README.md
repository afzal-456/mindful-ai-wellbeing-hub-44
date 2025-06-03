# MINDFUL-AI-WELLBEING-HUB-44

## Overview

`MINDFUL-AI-WELLBEING-HUB-44` is a web application built using a **React**, **TypeScript**, **Tailwind CSS**, and **Vite** stack. It offers a platform for users to sign up, log in, and access various well-being resources like AI chatbots, live sessions, and community features. Admins can manage user data and permissions, including banning or deleting users from both the platform and Firebase Authentication.

The project integrates Firebase for user authentication and Firestore for database storage. The backend has been set up using **Firebase Admin SDK** to handle administrative tasks such as deleting users from both the Firestore database and Firebase Authentication.

---

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Firebase Setup](#firebase-setup)
5. [Backend Server](#backend-server)
6. [Endpoints](#endpoints)
7. [Environment Variables](#environment-variables)
8. [Contributing](#contributing)
9. [License](#license)

---

## Installation

### Frontend

```bash
git clone https://github.com/afzal-456/mindful-ai-wellbeing-hub-44.git
cd mindful-ai-wellbeing-hub-44
npm install
npm run dev
```

### Backend (Firebase Admin)
Open another terminal and run : 
```bash
cd firebase-admin
npm install express cors firebase-admin
```

1. Download your Firebase service account key and save it as:
```bash
firebase-admin/service-account-key.json
```

2. Start the backend server:
```bash
node server.cjs
```
## Project Structure

### Frontend
```bash
/src
├── /components
├── /pages
├── /hooks
├── /utils
├── App.tsx
└── index.tsx
```
### Backend
```bash
/firebase-admin
├── deleteUser.cjs
├── server.cjs
├── firebaseAdmin.cjs
├── package.json
└── service-account-key.json
```

## Features
- Firebase Authentication with email/password and Google login

- Admin user management (delete/ban)

- Firestore storage: users and allowedUsers

- Express API backend for secure admin operation

## Firebase Setup

### Authentication

- Enable Email/Password and Google providers in Firebase Console.

### Firestore

- Create two collections:

  *users

  *allowedUsers
Each document should include an `email` field.

## Backend Server

### Endpoints
Delete User by UID
```bash
DELETE /api/delete-user/:uid
```

Delete User by Email
```bash
DELETE /api/delete-user-email/:email
```

## Environment Variables
Set `PORT=5001` (optional) or change it in `server.cjs`. Make sure the path to `service-account-key.json` is correct in `deleteUser.cjs`.

## Contributing

1. Fork the repository

2. Create a branch: `git checkout -b feature-name`

3. Commit: `git commit -am 'Add feature'`

4. Push: `git push origin feature-name`

5. Open a Pull Request

## License
This project is licensed under the MIT License.
