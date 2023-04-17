const path = require('path')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue'

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-better-transition',
      formats: ['es', 'umd'],
      fileName: (format: string) => `vue-better-transition.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'], // not every external has a global
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: 'named',
        globals: { vue: 'Vue' },
      },
    },
    emptyOutDir: false, // to retain the types folder generated by tsc
  },
})
