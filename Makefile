.PHONY: help dev build start lint install clean

help:
	@echo "Karl Homepage - Available commands:"
	@echo ""
	@echo "  make install - Install npm dependencies"
	@echo "  make dev     - Start Next.js development server"
	@echo "  make build   - Create a production build"
	@echo "  make start   - Start the production server"
	@echo "  make lint    - Run linting"
	@echo ""

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

install:
	npm install

clean:
	@echo "Cleaned up"

.DEFAULT_GOAL := help
