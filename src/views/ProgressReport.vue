<template>
  <div v-if="map" class="content">
    <v-card>
      <v-card-title><b>Map: </b> {{ map.name }}</v-card-title>
      <v-card-text>
        <div class="row-wrapper d-flex justify-space-between">
          <div class="row d-flex flex-column">
            <div class="row d-flex justify-space-between">
              <div class="left-side">Start Date</div>
              <div class="right-side">{{ getFormattedDate(map.dateStart) }}</div>
            </div>

            <div class="row d-flex justify-space-between">
              <div class="left-side">End Date</div>
              <div class="right-side">Not finished yet</div>
            </div>

            <div class="row d-flex justify-space-between" :style="{opacity: 0}">
              <div class="left-side">End Date</div>
              <div class="right-side">Not finished yet</div>
            </div>
          </div>

          <div class="row d-flex flex-column">
            <div class="row d-flex justify-space-between">
              <div class="left-side">Duration</div>
              <div class="right-side">{{ getFormattedDuration(map.duration) }}</div>
            </div>

            <div class="row d-flex justify-space-between">
              <div class="left-side">Status</div>
              <div class="right-side">{{ map.status }}</div>
            </div>

            <div class="row d-flex justify-space-between">
              <div class="left-side">Progress</div>
              <div class="right-side">{{ map.progress }}%</div>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab>Tasks</v-tab>
        <v-tab>Dictionary</v-tab>
        <v-tab>Local coordinator</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <task-details :map-reports="map.reports"/>
        </v-tab-item>
        <v-tab-item>
          <dictionary-details :dictionary-reports="map.dictionaryReports"/>
        </v-tab-item>
        <v-tab-item>
          <task-details :map-reports="map.reports"/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import * as actionTypes from '@/store/actionTypes';
import { MapInfoStats } from '@/interfaces/map-info-stats';
import TaskDetails from '@/components/reports/TaskDetails.vue';
import DictionaryDetails from '@/components/reports/DictionaryDetails.vue';
import * as helpers from '@/utils/helpers';

@Component({
  components: {DictionaryDetails, TaskDetails}
})
export default class ProgressReport extends Vue {
  @Getter map!: MapInfoStats;
  tab: number = 0;

  async mounted(): Promise<void> {
    const userId = this.$route.params.id;

    if (!userId) {
      await this.$router.push('/');
      return;
    }

    await this.$store.dispatch(actionTypes.FETCH_REPORTS, userId);
  }

  getFormattedDate(date: Date): string {
    return helpers.getFormattedDate(date);
  }

  getFormattedDuration(duration: number): string {
    return helpers.getFormattedDuration(duration);
  }
}
</script>

<style scoped lang="scss">
.content {
  .row-wrapper {
    width: 100%;

    .row {
      max-width: 400px;
      padding: 0 12px;
    }
  }
}
</style>
