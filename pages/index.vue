<template>
  <v-row justify="center" align="center">
    <v-col cols="12" xs="12">
      <v-card flat>
        <v-card-text>
          <v-form ref="form">
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
            @click="readChannel"
            color="primary"
            large
            outlined
            :loading="loading"
          >
            Read Channel
          </v-btn>
        </v-card-actions>
        <div class="result-wrapper">
          <v-progress-linear
            v-if="loading"
            color="primary"
            indeterminate
            height="8"
          ></v-progress-linear>
          <div v-else class="loader-spacer"></div>

          <v-expansion-panels class="expansion-panel">
            <v-expansion-panel
              v-for="(entry, index) in data_entries"
              :key="index"
            >
              <v-expansion-panel-header>
                {{
                  $moment(entry.timestamp * 1000).format(
                    "MMMM Do YYYY, hh:mm:ss"
                  )
                }}
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-card class="mx-auto" flat>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        <v-container>
                          <v-row justify="center" align="center">
                            <div class="device-id">
                              <strong>Device ID: {{ entry.device }}</strong>
                            </div>

                            <v-spacer />

                            <v-btn
                              @click="showFull()"
                              color="primary"
                              outlined
                              x-small
                            >
                              {{ fullVisible ? "Parsed" : "Raw" }}
                            </v-btn>
                          </v-row>
                        </v-container>
                      </v-list-item-subtitle>

                      <pre v-if="fullVisible">
                      {{ entry.iot2tangle }}
                    </pre
                      >

                      <v-card
                        v-else
                        v-for="(item, index) in entry.iot2tangle"
                        :key="index"
                        class="mx-auto"
                        flat
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="overline mb-4">{{ item.sensor }}:</div>
                            <pre>{{ item.data }}</pre>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
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
    VuetifyLogo
  },
  data: () => ({
    data_entries: [],
    loading: false,
    allowSpaces: false,
    max: 80,
    model:
      "98bf096faa7048fd2238fc5573c6ecbeec1612fbcc7590f84094eb52e0dbf7570000000000000000",
    fullVisible: false
  }),
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
    },
    showFull() {
      this.fullVisible = !this.fullVisible;
    },
    async readChannel({ $axios }) {
      this.loading = true;
      let res;
      try {
        res = await this.$axios
          .$get(process.env.baseUrl + "/decode_channel/" + this.model, {
            headers: {
              "Content-Type": "text/plain"
            }
          })
          .then(response => {
            if (response.status == "Success") {
              this.data_entries = response.messages.map(x => JSON.parse(x));
            }
            this.loading = false;
          });
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.result-wrapper {
  margin-top: 20px;
}

.loader-spacer {
  height: 8px;
}

.device-id {
  word-break: break-all;
}

pre {
  background-color: #dadada;
  border: 1px solid #cacaca;
  border-radius: 4px;
  margin-top: 0px;
  padding: 5px;
  font-size: 14px;
}
</style>
