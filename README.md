# Northspec Studio

This repository contains the source code for the Northspec Studio project, organized into three main components: a backend API, a public frontend website, and an internal dashboard.

## Project Structure

The project is divided into the following directories:

- **BackEnd/**: A Node.js and Express-based REST API that powers the application's data management.
- **FrontEnd/**: A Next.js (v15) application serving as the public-facing website.
- **Dashboard/**: A Next.js (v16) application serving as the internal administration dashboard.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (Ensure you have a running instance or connection string)

### Installation

Navigate to each directory and install the dependencies:

#### Backend
```bash
cd BackEnd
npm install
```

#### Frontend
```bash
cd FrontEnd
npm install
```

#### Dashboard
```bash
cd Dashboard
npm install
```

## Running the Applications

You will need to run each component in a separate terminal window.

### Backend API

To start the backend server:

```bash
cd BackEnd
# Run in development mode (with watch)
npm run dev

# Or run in production mode
npm start
```

The server typically runs on port `4000` (check `server.js` or `.env` configuration).

### Frontend Website

To start the public website:

```bash
cd FrontEnd
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### Dashboard

To start the dashboard application:

```bash
cd Dashboard
npm run dev
```

The dashboard will be available at `http://localhost:3000` (Note: If running simultaneously with the Frontend, Next.js will usually prompt to use a different port, e.g., `3001`).

## Configuration

Ensure you have the necessary environment variables set up for each component.
- **BackEnd**: Check for a `.env` file or create one based on requirements (DB connection, etc.).
- **FrontEnd/Dashboard**: Check `next.config.js` or `.env.local` files for configuration.
