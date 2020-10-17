<template>
  <v-row justify="center" align="center">
    <v-col cols="12" xs="12">
      <search-box></search-box>
    </v-col>
  </v-row>
</template>

<script>
import SearchBox from "~/components/SearchBox.vue";

export default {
  components: {
    SearchBox
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
</style>
