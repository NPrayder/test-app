<template>
  <div class="content">
    <h1 class="page-title text-uppercase">Report</h1>
    <v-divider class="divider"/>

    <div class="cards-container mt-3 d-flex flex-wrap">
      <v-card
          v-for="i in 2"
          :key="i"
          class="detail-card mr-3 mb-3"
          elevation="2"
          :to="'/reports/' + i"
      >
        <v-card-title class="card-title">Detailed report #{{ i }} <v-spacer/> <v-icon class="right-icon">mdi-chevron-right</v-icon></v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Reports extends Vue {

}
</script>

<style scoped lang="scss">
@import "../assets/styles/colors";

.content {
  .page-title {
    font-size: 48px;
    line-height: 64px;
  }

  .divider {
    border-color: $grey;
  }

  .cards-container {
    .detail-card {
      max-width: 300px;
      width: 100%;

      .card-title {
        color: #3D3D3D;

        .right-icon {
          color: #1B1B1B;
        }
      }
    }
  }
}
</style>
