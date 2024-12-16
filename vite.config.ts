import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: true,
      watch: {
        usePolling: true, // Bật chế độ polling để theo dõi file thay đổi
      },
      port: 5173,
      hmr: {
        clientPort: 5173, // Đảm bảo HMR sử dụng đúng port
      },
    },
    plugins: [react()],

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },

    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@features": path.resolve(__dirname, "src/features"),
        "@store": path.resolve(__dirname, "src/store"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@data": path.resolve(__dirname, "src/data"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@services": path.resolve(__dirname, "src/services"),
        "@config": path.resolve(__dirname, "src/config"),
      },
    },
  };
});
