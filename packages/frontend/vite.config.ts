import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path from 'node:path'
import { packageDirectorySync } from 'pkg-dir'

const packageRoot = packageDirectorySync()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(packageRoot, './src')
    }
  }
})
