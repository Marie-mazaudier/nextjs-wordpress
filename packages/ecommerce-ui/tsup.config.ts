import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src"],
  format: ["cjs"],
  // rules for copy tailwind css config file to dist directory
  copy: ["tailwind.config.js", "postcss.config.js"],
  exclude: ["node_modules", "package.json"],
  clean: true,
  ...options,
}));
