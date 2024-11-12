# Используем официальный Node.js образ
FROM node:16-alpine

# Задаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшуюся часть приложения
COPY . .

# Строим приложение
RUN npm run build

# Сервер для статических файлов
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
