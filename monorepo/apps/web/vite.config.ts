import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path'

// 获取 monorepo 根目录
const workspaceRoot = resolve(__dirname, '../../');
// 指向 UI 库的源码目录
const uiSourceDir = resolve(workspaceRoot, 'packages/ui/src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // ✅ 关键配置：将 @fabernpm/ui 映射到其源码目录
      '@fabernpm/ui': uiSourceDir,
      // 💡 建议：将 React 和 React-DOM 显式指向 web 应用的 node_modules 实例
      //   这可以避免 Monorepo 中常见的 React Hooks 冲突错误
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    }
  },
  // 优化 Vite 依赖预构建，排除本地包
  optimizeDeps: {
    exclude: ['@fabernpm/ui']
  }
});