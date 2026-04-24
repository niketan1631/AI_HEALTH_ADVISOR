import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    server: {
      port: 3000,
      host: true,
      allowedHosts: ["ai-health-advisor-2d5z.onrender.com"], // ✅ FIXED (no https, must be array)
    },

    preview: {
      port: 3000,
      host: true,
      allowedHosts: ["ai-health-advisor-2d5z.onrender.com"], // ✅ ALSO REQUIRED for preview
    },

    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});