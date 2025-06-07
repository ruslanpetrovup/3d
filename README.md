# 3D Doll Service

Этот репозиторий содержит бэкенд на **NestJS** и фронтенд на **Next.js** для сервиса по генерации 3D‑моделей и оформлению заказа на печать.

## Структура проекта

- `backend/` — исходники NestJS сервера
- `frontend/` — клиентское приложение на Next.js

## Запуск бэкенда

1. Установите зависимости:
   ```bash
   cd backend
   npm install
   ```
2. Создайте файл `.env` со значениями переменных окружения:
   ```env
   API_URL=http://localhost:3001
   FRONTEND_URL=http://localhost:3000
   OPENAI_API_KEY=
   TELEGRAM_BOT_TOKEN=
   TELEGRAM_ADMIN_CHAT_ID=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   SMTP_HOST=
   SMTP_PORT=
   SMTP_USER=
   SMTP_PASSWORD=
   SMTP_FROM=
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=lilyou_db
   ```
3. При необходимости запустите PostgreSQL:
   ```bash
   docker compose -f backend/docker-compose.yml up -d
   ```
4. Запустите сервер в режиме разработки:
   ```bash
   npm run start:dev
   ```

## Запуск фронтенда

1. Установите зависимости:
   ```bash
   cd frontend
   npm install
   ```
2. Создайте `.env.local` и укажите адрес бэкенда:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
3. Запустите приложение в режиме разработки:
   ```bash
   npm run dev
   ```

## Дополнительно

Подробное описание бизнес‑процесса создания 3D‑модели можно найти в файле [`backend/info.md`](backend/info.md).
