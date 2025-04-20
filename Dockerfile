# Используем официальный образ Node.js на Alpine (легковесный)
FROM node:18-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем serve для статических файлов (альтернатива vite preview)
RUN npm install -g serve

# Открываем порт, который использует serve (по умолчанию 3000)
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "dist"]