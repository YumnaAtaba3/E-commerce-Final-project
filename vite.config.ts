import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const repoName = "E-commerce-Final-project";

export default defineConfig({
  base: `/${repoName}/`, 
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
