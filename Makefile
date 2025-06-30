# Makefile для Laravel + Docker проекта

up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose up -d --build

bash:
	docker exec -it laravel_app bash

composer-install:
	docker exec -it laravel_app composer install

npm-install:
	docker exec -it laravel_app npm install

npm-dev:
	docker exec -it laravel_app npm run dev

migrate:
	docker exec -it laravel_app php artisan migrate
permission:
	docker exec -it laravel_app php artisan sync:roles-permissions
admin:
	docker exec -it laravel_app php artisan make:admin avagyan.narek95@gmail.com

cache-clean:
	docker exec -it laravel_app php artisan config:clear
	docker exec -it laravel_app php artisan cache:clear
	docker exec -it laravel_app php artisan config:cache
	docker exec -it laravel_app composer dump-autoload


seed:
	docker exec -it laravel_app php artisan db:seed

artisan:
	docker exec -it laravel_app php artisan

fresh:
	docker exec -it laravel_app php artisan migrate:fresh --seed

logs:
	docker-compose logs -f app

test:
	docker exec -it laravel_app php artisan test


socket-test:
	docker exec -it laravel_app php artisan app:send-test-event
queue:
	docker exec -it laravel_app php artisan queue:work
socket-restart:
	docker exec -it laravel_echo_server laravel-echo-server restart
socket-init:
	docker exec -it laravel_echo_server laravel-echo-server init
