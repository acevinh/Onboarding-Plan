# Sử dụng image PHP
FROM php:8.1-fpm

# Cài đặt các extension cần thiết
RUN docker-php-ext-install pdo pdo_mysql

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www

# Sao chép mã nguồn vào container
COPY . .

# Cài đặt các package của Laravel
RUN composer install

# Cấu hình quyền cho thư mục storage và bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache