import colors from "vuetify/es5/util/colors";

export default {
  // use this for different base routes
  // router: {
  //   base: '/explorer/'
  // },
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - I2T Streams Explorer",
    title: "I2T Streams Explorer",
    description: "An Explorer for IOTA Streams.",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/moment"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: false,
    font: {
      family: "Montserrat"
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#16a1ff", // #E53935
          secondary: "#6c757d", // #FFCDD2
          accent: "#2b56f5" // #3F51B5
        }
      }
    }
  },
  moment: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  }
};
