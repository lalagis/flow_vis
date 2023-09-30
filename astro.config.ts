import { defineConfig } from 'astro/config'
import million from 'million/compiler'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [million.vite({ mode: 'react', server: true, auto: true })]
  },

  integrations: [
    UnoCSS({
      injectReset: true
    }),
  ],
})
