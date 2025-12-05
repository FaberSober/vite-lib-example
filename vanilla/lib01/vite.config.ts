import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    // 自动生成 .d.ts 类型文件
    dts({ 
      include: ['src'],
      rollupTypes: true // 可选：合并为一个 index.d.ts 文件
    }),
  ],
  build: {
    // 库模式配置
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // 入口文件
      name: 'MyLib', // UMD 格式下的全局变量名
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`, // 输出文件名规则
      formats: ['es', 'umd'], // 输出 ES Module 和 UMD (CommonJS 兼容)
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // ----------------------------------------------------
        // ✅ 关键修改点：使用 assetFileNames 确保 CSS 文件命名为 style.css
        assetFileNames: (assetInfo) => {
          // Rollup/Vite 会将提取的 CSS 文件命名为一个 asset
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            // 确保所有 CSS 文件都被命名为 style.css，并放在 dist 根目录
            return 'style.css'; 
          }
          // 对于其他静态资源 (如图片、字体等)，使用默认的哈希命名规则
          return 'assets/[name]-[hash][extname]';
        },
        // ----------------------------------------------------
      },
    },
  },
});