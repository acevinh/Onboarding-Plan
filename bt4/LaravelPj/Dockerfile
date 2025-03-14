# Sử dụng image PHP với Apache
FROM php:8.1-apache

# Cài đặt các extension cần thiết
RUN docker-php-ext-install pdo pdo_mysql

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Sao chép mã nguồn vào container
COPY . /var/www/html

# Thiết lập quyền cho thư mục storage và bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Mở cổng 80
EXPOSE 80
