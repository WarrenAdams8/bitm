// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@hebilicious/vue-query-nuxt", "@vueuse/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  typescript: {
    strict: true,
  },
});
