.PHONY: deploy-test
deploy-test:
	fly deploy -c ./deploy/fly.test.toml

.PHONY: deploy-prod
deploy-prod:
	fly deploy -c ./deploy/fly.prod.toml

.PHONY: docker-build
docker-build:
	docker build -t rebrew .

