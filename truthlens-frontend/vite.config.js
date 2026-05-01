import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    proxy: {
      "/analyze": "http://localhost:3000",
      "/explain": "http://localhost:3000",
      "/report": "http://localhost:3000",
      "/health": "http://localhost:3000",
    },
  },
});