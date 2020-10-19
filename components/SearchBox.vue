<template>
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        v-on:submit.prevent="
          $router.push({ name: 'channel-channel', params: { channel: model } })
        "
      >
        <v-text-field
          v-model="model"
          :counter="max"
          :rules="rules"
          label="Channel address"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        :disabled="loading"
        color="primary"
        large
        outlined
        :loading="loading"
      >
        <nuxt-link :to="{ name: 'channel-channel', params: { channel: model } }"
          >Read Channel</nuxt-link
        >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SearchBox from "~/components/SearchBox.vue";
import { MAX_LENGTH } from "~/helpers/constants.js";

export default {
  data: () => ({
    loading: false,
    allowSpaces: false,
    max: MAX_LENGTH,
    model: "",
    fullVisible: false
  }),
  mounted() {
    this.model =
      this.$route.params.channel ||
      "64e592476ed7619d04526f6360f150d4bce63046511dde3f8665e5aec6b51ffc0000000000000000:78829daa792010edd2c7dbfb";
  },
  computed: {
    rules() {
      const rules = [];

      if (this.max) {
        const rule = v =>
          (v || "").length <= this.max ||
          `A maximum of ${this.max} characters is allowed`;

        rules.push(rule);
      }

      if (!this.allowSpaces) {
        const rule = v => (v || "").indexOf(" ") < 0 || "No spaces are allowed";

        rules.push(rule);
      }

      return rules;
    }
  },

  watch: {
    max: "validateField",
    model: "validateField"
  },

  methods: {
    validateField() {
      this.$refs.form.validate();
    }
  }
};
</script>
