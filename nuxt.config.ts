// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      paddleSellerId: "",
      paddleToken: "",
    },
    stripeKey: "",
    paddleKey: "",
    webhookSecret: "",
  },
  devtools: { enabled: true },
  modules: [
    "@hebilicious/vue-query-nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-vuefire",
  ],
  typescript: {
    strict: true,
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyApJZlVnu2fnjUVcMjZtmhNW8Q5g1yo0WQ",
      authDomain: "bitm-40798.firebaseapp.com",
      projectId: "bitm-40798",
      storageBucket: "bitm-40798.appspot.com",
      messagingSenderId: "762520880131",
      appId: "1:762520880131:web:c2189647c5afc48acf7a36",
      measurementId: "G-TYD8CXF930",
    },
    auth: {
      enabled: true,
      sessionCookie: true,
    },
  },
});
