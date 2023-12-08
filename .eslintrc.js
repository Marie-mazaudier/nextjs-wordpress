module.exports = {
  root: true,
  extends: ["next/babel", "next", "turbo", "prettier"], // Ajoutez ces extensions
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
