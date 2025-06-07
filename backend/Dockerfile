# Базовый образ Node.js
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Создаем директорию uploads если её нет
RUN mkdir -p uploads

# Собираем приложение
RUN npm run build

# Открываем порт
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
