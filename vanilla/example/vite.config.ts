import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

// 假设 example 和 lib01 是同级目录
const libRoot = resolve(__dirname, '../lib01');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 🚨 关键配置：将包名映射到 lib 的源码入口
      '@fabernpm/lib01': libRoot + '/src',
    }
  },
  // 优化 Vite 依赖预构建，避免解析错误
  optimizeDeps: {
    exclude: ['@fabernpm/lib01']
  }
})
