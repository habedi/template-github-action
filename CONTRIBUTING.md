## Contribution Guidelines

Thank you for considering contributing to this project!
Contributions are always welcome and appreciated.

### How to Contribute

Please check the [issue tracker](https://github.com/habedi/template-github-action/issues) to see if there is an issue
you would like to work on or if it has already been resolved.

#### Reporting Bugs

1. Open an issue on the [issue tracker](https://github.com/habedi/template-github-action/issues).
2. Include information such as steps to reproduce the observed behavior, logs, and screenshots.

#### Suggesting Features

1. Open an issue on the [issue tracker](https://github.com/habedi/template-github-action/issues).
2. Provide details about the feature, its purpose, and potential implementation ideas.

### Submitting Pull Requests

- Make sure all TypeScript sources typecheck and tests pass (`make test`).
- Make sure the compiled bundle is updated (`make build`).
- Make sure Git hooks pass (`make test-hooks`) before submitting a pull request.
- Write a clear description of the changes you made, and explain the reasons behind them.

> [!IMPORTANT]
> By submitting a pull request, you agree to license your contributions under the project's licenses.

### Development Workflow

> [!IMPORTANT]
> If you are using an AI-assisted coding tool, make sure it follows the instructions in the [AGENTS.md](AGENTS.md) file.

#### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 20 or higher) installed on your system, or use [Nix](https://nixos.org/download.html) with flakes enabled:

```shell
nix develop
```

Or install dependencies with npm:

```shell
make install-deps
```

#### Common Commands

- `make build`: Bundle the action with ncc into `dist/`.
- `make test`: Run the Vitest unit test suite.
- `make check`: Typecheck TypeScript files without emitting code.
- `make lint`: Check source files with ESLint.
- `make format`: Format source files with Prettier.
- `make help`: Display all available Makefile targets.

### Code of Conduct

We adhere to the project's [Code of Conduct](CODE_OF_CONDUCT.md).
