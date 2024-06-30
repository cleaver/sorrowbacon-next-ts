
version ?= latest

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
	@echo '  $$ make tag version=...'
	@echo '  Tag "latest" image with new version.'
	@echo '  '
	@echo '  $$ make push [version=...]'
	@echo '  Push the production image.'
	@echo '  '
	@echo 'Currently Running:  '
	@echo '  '
	@docker ps

dev:
	docker build -t ghcr.io/cleaver/sorrowbacon-next-ts . 2>&1 | tee build.log

prod:
	source ./build.env; \
	docker build \
	--no-cache \
	--build-arg API_SERVER \
	--build-arg API_KEY \
	--build-arg NEXT_PUBLIC_MAILCHIMP_URL \
	--build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID \
	--network=host \
	-f Dockerfile.production \
	-t ghcr.io/cleaver/sorrowbacon-next-ts \
	. \
	2>&1 | tee build.log

logs:
	docker logs -f nextjs

tag:
	docker image tag ghcr.io/cleaver/sorrowbacon-next-ts:latest ghcr.io/cleaver/sorrowbacon-next-ts:$(version)

push:
	docker push ghcr.io/cleaver/sorrowbacon-next-ts:$(version)

