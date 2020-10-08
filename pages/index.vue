<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> streams-explorer</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="model"
              :counter="max"
              :rules="rules"
              label="channel address"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn :disabled="loading" @click="read_channel" color="primary">
            Read Channel
          </v-btn>
        </v-card-actions>

        <v-progress-linear
          v-if="loading"
          color="primary"
          indeterminate
          rounded
          height="8"
        ></v-progress-linear>

        <v-card
          v-for="(entry, index) in data_entries"
          :key="index"
          class="mx-auto"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                {{
                  $moment(entry.timestamp * 1000).format(
                    "MMMM Do YYYY, hh:mm:ss"
                  )
                }}
              </div>
              <v-list-item-subtitle
                >Device ID: {{ entry.device }}</v-list-item-subtitle
              >
              <div v-for="(item, index) in entry.xdk2mam" :key="index">
                <p>{{ item.sensor }}</p>
                <pre>{{ item.data }}</pre>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  data: () => ({
    data_entries: [],
    loading: false,
    allowSpaces: false,
    max: 80,
    model:
      "98bf096faa7048fd2238fc5573c6ecbeec1612fbcc7590f84094eb52e0dbf7570000000000000000",
  }),
  computed: {
    rules() {
      const rules = [];

      if (this.max) {
        const rule = (v) =>
          (v || "").length <= this.max ||
          `A maximum of ${this.max} characters is allowed`;

        rules.push(rule);
      }

      if (!this.allowSpaces) {
        const rule = (v) =>
          (v || "").indexOf(" ") < 0 || "No spaces are allowed";

        rules.push(rule);
      }

      return rules;
    },
  },

  watch: {
    max: "validateField",
    model: "validateField",
  },

  methods: {
    validateField() {
      this.$refs.form.validate();
    },
    async read_channel({ $axios }) {
      this.loading = true;
      console.log("this channel: ", this.model);
      let res;
      try {
        // res = await this.$axios.$get(
        //   "http://localhost:8585/decode_channel", {data: this.model}
        // );

        res = await this.$axios
          .$get(process.env.baseUrl + "/decode_channel/" + this.model, {
            headers: {
              "Content-Type": "text/plain",
            },
          })
          .then((response) => {
            console.log(response);

            if (response.status == "Success") {
              this.data_entries = response.messages.map((x) => JSON.parse(x));
            }
            this.loading = false;
          });
      } catch (error) {
        console.log("error: ", error);
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.logo {
  width: 300px;
}
</style>