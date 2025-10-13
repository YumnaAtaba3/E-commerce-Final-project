import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export const REPO_NAME = "E-commerce-Final-project";

export default defineConfig({
  base: `/${REPO_NAME}/`, 
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
