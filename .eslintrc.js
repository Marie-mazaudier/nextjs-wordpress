module.exports = {
  root: true,
  extends: ["next", "turbo", "prettier"], // "next/babel" a été supprimé de cette ligne
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
