// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    private: {
      paddleApi: "",
    },
    public: {
      paddleSellerId: "",
      paddleToken: "",
    },
  },
  devtools: { enabled: true },
  modules: [
    "@hebilicious/vue-query-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/supabase",
  ],
  typescript: {
    strict: true,
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      exclude: [],
    },
  },
});
