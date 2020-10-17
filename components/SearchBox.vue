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
      "df627a565c9f9673a5113c1a8fa5568c36aeb7618c6c6d0db72d58a1574f0fb40000000000000000:023199038f8760ed6d3344d1";
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
