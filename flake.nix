{
  description = "A template for custom GitHub Actions with TypeScript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            gnumake
            git
            graphviz
            pre-commit
            uv
            python3
          ];

          shellHook = ''
            echo "GitHub Action development shell loaded."
            echo "Node version: $(node --version 2>/dev/null || echo 'not found')"
            echo "npm version:  $(npm --version 2>/dev/null || echo 'not found')"
            echo "Run 'make help' to see available Makefile targets."
          '';
        };
      }
    );
}
