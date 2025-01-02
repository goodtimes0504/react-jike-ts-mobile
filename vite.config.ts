import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // 根据需要添加更多别名
      "@components": resolve(__dirname, "./src/components"),
      "@views": resolve(__dirname, "./src/views"),
      "@assets": resolve(__dirname, "./src/assets"),
    },
  },
})
