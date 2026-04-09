# CCGrupo - Makefile
# Comandos unificados para el proyecto

.PHONY: help install dev build preview lint test clean

help:
	@echo "CCGrupo - Comandos disponibles:"
	@echo ""
	@echo "  make install    Instalar dependencias"
	@echo "  make dev        Iniciar dev server (http://localhost:3000)"
	@echo "  make build      Build de producción"
	@echo "  make preview    Preview del build"
	@echo "  make lint       Type-check TypeScript"
	@echo "  make test       Ejecutar tests"
	@echo "  make test:watch Tests en modo watch"
	@echo "  make test:cov   Tests con coverage"
	@echo "  make clean      Limpiar build"
	@echo ""

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

eslint:
	npx eslint src --max-warnings 50

test:
	npm run test

test:watch:
	npm run test:watch

test:cov:
	npm run test:coverage

clean:
	npm run clean