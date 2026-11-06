# Variables
PACKAGE_NAME := template-github-action
NPM := $(shell command -v npm 2>/dev/null || echo "npm")
UV := $(shell command -v uv 2>/dev/null || echo "uv")
PRE_COMMIT := $(shell command -v pre-commit 2>/dev/null || (command -v uv >/dev/null 2>&1 && echo "uv run pre-commit") || echo "pre-commit")
ASSET_DIR := docs/assets
SHELL := /bin/bash

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show help messages for all available targets
	@grep -E '^[a-zA-Z_-]+:.*## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: ## Bundle the GitHub Action using ncc into dist/
	@echo "Bundling $(PACKAGE_NAME)..."
	@$(NPM) run bundle

.PHONY: check
check: ## Type check TypeScript sources without emitting files
	@echo "Type checking TypeScript sources..."
	@$(NPM) run build

.PHONY: test
test: ## Run the Vitest test suite
	@echo "Running tests..."
	@$(NPM) test

.PHONY: test-watch
test-watch: ## Run the Vitest test suite in watch mode
	@echo "Running tests in watch mode..."
	@$(NPM) run test:watch

.PHONY: lint
lint: ## Run ESLint on the codebase
	@echo "Linting TypeScript and JavaScript files..."
	@$(NPM) run lint

.PHONY: lint-fix
lint-fix: ## Automatically fix ESLint warnings and errors
	@echo "Fixing lint errors..."
	@$(NPM) run lint:fix

.PHONY: format
format: ## Format files using Prettier
	@echo "Formatting files with Prettier..."
	@$(NPM) run format

.PHONY: format-check
format-check: ## Check file formatting with Prettier
	@echo "Checking formatting with Prettier..."
	@$(NPM) run format:check

.PHONY: all
all: format-check lint check test build ## Run all checks, tests, and build the distribution bundle

.PHONY: clean
clean: ## Remove build and coverage artifacts
	@echo "Cleaning build and coverage artifacts..."
	@rm -rf dist lib coverage .nyc_output

.PHONY: install-deps
install-deps: ## Install npm and development dependencies
	@echo "Installing npm dependencies..."
	@$(NPM) install
	@if command -v uv >/dev/null 2>&1; then \
		echo "Syncing Python dependencies with uv..."; \
		$(UV) sync; \
	fi

.PHONY: figs
figs: ## Generate figures from .dot files in the assets directory
	@echo "Generating figures..."
	@if [ -f $(ASSET_DIR)/make_figures.sh ]; then \
		$(SHELL) $(ASSET_DIR)/make_figures.sh $(ASSET_DIR); \
	fi

.PHONY: setup-hooks
setup-hooks: ## Install Git pre-commit hooks
	@echo "Setting up Git hooks..."
	@$(PRE_COMMIT) install --hook-type pre-commit
	@$(PRE_COMMIT) install --hook-type pre-push

.PHONY: test-hooks
test-hooks: ## Test Git hooks on all tracked files
	@echo "Running Git hooks on all files..."
	@$(PRE_COMMIT) run --hook-stage pre-push --all-files --show-diff-on-failure
