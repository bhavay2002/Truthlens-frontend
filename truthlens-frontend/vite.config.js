import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts:
      "all ,e424dc8b-faae-4ab9-b6d9-e11e18e9e50c-00-wq3pnrno3ixn.janeway.replit.dev",
    proxy: {
      "/analyze": "http://localhost:3000",
      "/explain": "http://localhost:3000",
      "/report": "http://localhost:3000",
      "/health": "http://localhost:3000",
    },
  },
});
