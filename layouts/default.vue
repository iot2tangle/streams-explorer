<template>
  <v-app dark flat>
    <v-app-bar
      :clipped-left="clipped"
      color="white"
      elevate-on-scroll
      flat
      fixed
      app
    >
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      />
      <nuxt-link to="/">
        <img class="logo" src="~/assets/i2t-explorer-logo.png" />
      </nuxt-link>

      <v-spacer />

      <div v-show="$vuetify.breakpoint.mdAndUp">
        <v-btn
          v-for="(item, index) in items"
          :key="index"
          :href="item.href"
          target="_blank"
          text
        >
          <strong>{{ item.title }}</strong>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main color="red">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-show="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      temporary
      fixed
    >
      <v-list class="drawer">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click.native="right = !right"
        >
          <v-btn :href="item.href" text>
            <strong>{{ item.title }}</strong>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :absolute="!fixed" app>
      <v-container>
        <v-row justify="center">
          <img class="logo" src="~/assets/i2t-explorer-logo.png" />
        </v-row>
        <v-row
          v-show="$vuetify.breakpoint.smAndDown"
          justify="center"
          v-for="(item, index) in items"
          :key="index"
        >
          <div>
            <v-btn :href="item.href" target="_blank" text>
              <strong>{{ item.title }}</strong>
            </v-btn>
          </div>
        </v-row>
        <v-row v-show="$vuetify.breakpoint.mdAndUp" justify="center">
          <div class="link-container">
            <v-btn
              :href="item.href"
              target="_blank"
              text
              v-for="(item, index) in items"
              :key="index"
            >
              <strong>{{ item.title }}</strong>
            </v-btn>
          </div>
        </v-row>
        <v-row justify="center">
          <p class="copyright-text">
            &copy; Copyright {{ new Date().getFullYear() }}
          </p>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "iot2tangle.io",
          href: "https://iot2tangle.io"
        },
        {
          title: "I2THub",
          href: "https://github.com/iot2tangle"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  }
};
</script>

<style>
.logo {
  height: 42px;
}

body {
  font-family: "Montserrat", sans-serif !important;
}

.drawer {
  margin-top: 50px;
}

.link-container {
  margin-top: 10px;
}

.copyright-text {
  margin-top: 10px;
  font-size: 12px;
  color: #a1a1a1;
}
</style>
