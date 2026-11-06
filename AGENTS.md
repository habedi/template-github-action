# AGENTS.md

This file provides guidance to coding agents collaborating on this repository.

## Mission

This repository is a template for custom GitHub Actions with TypeScript.
It provides a starter project with:

1. A GitHub Action definition (`action.yml`) targeting Node 20.
2. Bundled standalone distribution (`dist/index.js`) using `@vercel/ncc`.
3. A unit test suite powered by Vitest.
4. Continuous integration workflows for unit testing, integration self-testing, and linting.
5. Reproducible development environments via Nix, pre-commit, and npm.

Priorities, in order:

1. Correct action execution, proper input and output handling, and reliable error reporting.
2. Synchronization between TypeScript source code in `src/` and the bundled distribution in `dist/`.
3. Clean separation between core logic, the action runner, and tests.
4. Fast execution and minimal dependency footprint.

## Core Rules

- Use English for code, comments, documentation, tests, and commit messages.
- Follow standard TypeScript naming conventions: `camelCase` for functions and variables, `PascalCase` for types and interfaces, and `SCREAMING_SNAKE_CASE` for constants.
- Use explicit type annotations on exported functions and interfaces.
- Avoid unnecessary package dependencies.
- Keep documentation, comments, and examples aligned with actual codebase behavior.
- Rebuild the distribution bundle using `make build` whenever files in `src/` change.

## Writing Style

- Write in simple, plain English. Use short sentences and everyday words.
- Use Oxford commas in inline lists: "a, b, and c" not "a, b, c".
- Do not use em dashes. Restructure the sentence, or use a colon or semicolon instead.
- Avoid colorful adjectives and adverbs. Write "test driver" not "lightweight test driver".
- Use noun phrases for checklist items, not imperative verbs. Write "theorem verification" not "verify theorems".
- Headings in Markdown files must be in Title Case: "Build from Source" not "Build from source". Minor words (a, an, the, and, but, or, for, in, on, at, to, by, of, is, are, was, were, be) stay lowercase unless they are the first word.

## Repository Layout

- `action.yml`: Action metadata, inputs, outputs, and runtime configuration.
- `package.json`: NPM package metadata, scripts, and dependencies.
- `tsconfig.json`: TypeScript compiler configuration.
- `eslint.config.mjs`: ESLint configuration for code quality.
- `.prettierrc`: Code formatting rules for Prettier.
- `vitest.config.ts`: Vitest test runner configuration.
- `src/`: Action source files.
  - `src/action.ts`: Pure action logic and data formatting functions.
  - `src/main.ts`: Main action runner extracting inputs, invoking logic, and setting outputs.
  - `src/index.ts`: Action entrypoint for ncc compilation.
- `dist/`: Precompiled standalone distribution bundle committed for GitHub Actions execution.
- `tests/`: Vitest test files for unit testing.
- `Makefile`: Common development workflows and convenience targets.
- `flake.nix`: Nix flake defining reproducible development shells.
- `.github/workflows/`: GitHub Actions workflows for continuous integration.
  - `tests.yml`: Multi-platform unit testing and action integration testing.
  - `lints.yml`: Formatting checks, linting, type checks, bundle drift detection, and pre-commit hooks.
- `docs/`: Markdown documentation and project assets.
  - `docs/assets/`: Static project assets, including logos and figures.

## Code Conventions

### TypeScript Conventions

- Indent TypeScript code by 2 spaces.
- Prefer explicit type declarations for function parameters and return types.
- Export modular, pure functions from `src/action.ts` so they can be unit-tested without external side effects.
- Catch errors in `src/main.ts` and report failures using `core.setFailed`.
- Document exported functions and interfaces with JSDoc comments (`/** ... */`).

### Git and Development Conventions

- Test all changes locally with `make test` before submitting pull requests.
- Ensure formatting, typechecking, and pre-commit hooks pass with `make all` and `make test-hooks`.
- Keep commits focused on a single logical change.

## Required Validation

Run the narrowest relevant checks, then expand if the change crosses layers.

| Area                  | Command           | Use When                                           |
| :-------------------- | :---------------- | :------------------------------------------------- |
| Unit tests            | `make test`       | Any function, parameter, or test logic changed     |
| Type check            | `make check`      | Any TypeScript source file changed                 |
| Action bundle         | `make build`      | Source code in `src/` changed before committing    |
| Linter and formatting | `make lint`       | Pre-submission verification for code style         |
| Full pipeline check   | `make all`        | Before pushing commits or submitting pull requests |
| Git hooks             | `make test-hooks` | Pre-commit validation on all tracked files         |

Minimum expectations:

- TypeScript source changes: `make test`, `make build`, and `make check`.
- Workflow or tooling changes: `make lint` and `make test`.
- Pre-submission check: `make all` and `make test-hooks`.

## Change Design Checklist

Before coding:

1. Identification of target modules, action inputs, and outputs.
2. Clarification of expected behavior, edge cases, and error handling.
3. Verification of Node.js and action runner compatibility.

Before submitting:

1. Clean bundle generation via `make build`.
2. Passing test suite via `make test`.
3. Absence of typecheck errors via `make check`.
4. Absence of lint warnings via `make lint`.
5. Passing status for Git hooks via `make test-hooks`.
