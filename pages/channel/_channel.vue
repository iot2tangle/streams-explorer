<template>
  <v-row justify="center" align="center">
    <v-col cols="12" xs="12">
      <search-box></search-box>
      <v-card flat>
        <div class="result-wrapper">
          <v-progress-linear
            v-if="loading"
            color="primary"
            indeterminate
            height="8"
          ></v-progress-linear>
          <div v-else class="loader-spacer"></div>
          <v-card-text v-if="error"
            >An error occurred, please check that the channel
            exists.</v-card-text
          >
          <v-expansion-panels class="expansion-panel" v-else>
            <v-expansion-panel
              v-for="(entry, index) in data_entries"
              :key="index"
            >
              <v-expansion-panel-header>
                {{
                  $moment(entry.timestamp * 1000).format(
                    "MMMM Do YYYY, HH:mm:ss"
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
import SearchBox from "~/components/SearchBox.vue";
import { MAX_LENGTH } from "~/helpers/constants.js";

export default {
  components: {
    SearchBox
  },
  data: () => ({
    data_entries: [],
    error: false,
    loading: false,
    fullVisible: false
  }),

  validate({ params }) {
    return (
      params.channel.indexOf(" ") < 0 && params.channel.length <= MAX_LENGTH
    );
  },

  async fetch() {
    this.loading = true;
    this.error = false;
    await this.$axios
      .$get(
        process.env.baseUrl + "/decode_channel/" + this.$route.params.channel,
        {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      )
      .then(response => {
        if (
          response.status == "Error: Could not connect to Tangle" ||
          response.messages.length === 0
        ) {
          this.error = true;
        }

        if (response.status == "Success") {
          this.$emit(
            "data_entries",
            (this.data_entries = response.messages.map(x => JSON.parse(x)))
          );
        }

        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        this.error = true;
      });
  },

  methods: {
    showFull() {
      this.fullVisible = !this.fullVisible;
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
