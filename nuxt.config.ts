// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@hebilicious/vue-query-nuxt", "@vueuse/nuxt"],
  typescript: {
    strict: true,
  },
});