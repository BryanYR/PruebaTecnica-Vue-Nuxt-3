// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-25',
  devtools: { enabled: true },
  app:{
    head:{
      title: 'Prueba técnica - Bryan'
    }
  },
  modules: ['@nuxt/eslint'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [],
  css: ["~/assets/css/main.css"],
  build: {
    transpile: ["vue-toastification"],
  },
})
