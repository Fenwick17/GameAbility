import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    test: {
      coverage: {
        provider: "v8",
      },
    },
    define: {
      "import.meta.env": {
        ...env,
      },
    },
  };
});
