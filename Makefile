
container ?= webserver

help:
	@echo 'Commands:'
	@echo ''
	@echo '  $$ make dev'
	@echo '  Build the development image.'
	@echo '  '
	@echo '  $$ make prod'
	@echo '  Build the production image.'
	@echo '  '
	@echo '  $$ make logs'
	@echo '  Follow the container logs.'
	@echo '  '
	@echo '  $$ make push'
	@echo '  Push the production image.'
	@echo '  '
	@echo 'Currently Running:  '
	@echo '  '
	@docker ps

dev:
	docker build -t ghcr.io/cleaver/sorrowbacon-next-ts .

prod:
	NODE_ENV=production docker build --build-arg API_SERVER --build-arg API_KEY --network=host -f Dockerfile.production -t ghcr.io/cleaver/sorrowbacon-next-ts .

logs:
	docker logs -f nextjs

push:
	docker push ghcr.io/cleaver/sorrowbacon-next-ts:latest

