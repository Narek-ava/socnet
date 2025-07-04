FROM php:8.3-fpm

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && apt-get install -y \
    nodejs \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libzip-dev \
    zip unzip curl git && \
    rm -rf /var/lib/apt/lists/*

# Установка PHP расширений, включая redis
RUN  docker-php-ext-install exif pdo pdo_mysql zip gd pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
