# Dockerfile
FROM php:8.2-fpm-alpine

# Cài đặt các phần mở rộng PHP cần thiết
RUN apk add --no-cache \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    libzip-dev \
    zlib-dev \
    oniguruma-dev \
    && docker-php-ext-configure gd --with-jpeg --with-webp --with-xpm \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www

# Sao chép mã nguồn vào container
COPY . .

# Cài đặt các phụ thuộc của Laravel
RUN composer install

# Đặt quyền cho thư mục storage và bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port 9000
EXPOSE 9000

# Khởi động PHP-FPM
CMD ["php-fpm"]