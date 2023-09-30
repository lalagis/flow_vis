import { defineConfig } from 'astro/config'
import million from 'million/compiler'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [million.vite({ mode: 'react', server: true, auto: true })]
  }
})
