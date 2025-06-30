# Используем легковесный Node.js образ
FROM node:20-alpine

# Рабочая директория внутри контейнера
WORKDIR /usr/src/app

# Устанавливаем laravel-echo-server глобально
RUN npm install -g laravel-echo-server

# Копируем файл конфигурации внутрь контейнера (лучше смонтировать volume, но на всякий случай)
COPY laravel-echo-server.json ./laravel-echo-server.json
# Открываем порт 6001 для WebSocket
EXPOSE 6001

# Запускаем сервер laravel-echo-server с принудительным пропуском подтверждений
CMD ["laravel-echo-server", "start", "--force"]
