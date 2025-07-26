# webRtc

A simple WebRTC video call application using React, Vite, Socket.IO, and Node.js.

## Features

- Real-time peer-to-peer video calls using WebRTC
- User list and signaling via Socket.IO
- Responsive React frontend with Tailwind CSS
- Express/Node.js backend for signaling

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Usage

1. Start the backend server (`npm run dev` in `backend`).
2. Start the frontend (`npm run dev` in `frontend`).
3. Open the frontend in your browser (usually at [http://localhost:5173](http://localhost:5173)).
4. Open another browser window or device to connect and test video calls.

## Project Structure

```
webRtc/
├── backend/         # Express + Socket.IO signaling server
│   └── src/
│       └── index.ts
├── frontend/        # React + Vite + Tailwind CSS client
│   └── src/
│       └── components/
│           └── CallBox.tsx
│           └── Sidebar.tsx
│       └── main.tsx
│   └── vite.config.ts
└──