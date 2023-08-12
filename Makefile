lint-frontend:
	make -C hexlet-chat lint

install:
	npm ci

start-frontend:
	make -C hexlet-chat start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend