# 3D Project

This repository contains two main parts:

- `backend` - NestJS backend application
- `frontend` - Next.js frontend application

## Installing dependencies

Before running the tests with `npm test`, you must install the project dependencies. Run the following command inside the target directory:

```bash
npm install
```

For convenience, you can execute the provided `install.sh` script from the repository root to install dependencies for both the backend and frontend:

```bash
./install.sh
```

## Running tests

Tests are located in the `backend` project. After installing dependencies, run:

```bash
cd backend
npm test
```

## Telegram notifications

Set the `TELEGRAM_BOT_PASSWORD` environment variable in the backend. Telegram users can subscribe to notifications by sending `/auth <password>` to the bot. Their chat IDs will be stored in the database and used for event alerts.

