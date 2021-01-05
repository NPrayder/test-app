<template>
  <div class="content">
    <div class="user-selection">
      <v-combobox
          v-model="selectedUser"
          :items="users"
          item-text="name"
          label="Select user"
          outlined
          color="#000"
          rounded
          item-color="#000"
      ></v-combobox>
    </div>
    <div class="cards-container d-flex justify-center flex-wrap">
      <v-card min-width="300" class="mr-3 mb-3" @click="showReport('user')">
        <v-card-text class="d-flex justify-space-between align-center">
          <span class="card-title">User report</span>
          <v-spacer/>
          <v-icon large>mdi-chevron-right</v-icon>
        </v-card-text>
      </v-card>

      <v-card min-width="300" class="mr-3 mb-3" @click="showReport('progress')">
        <v-card-text class="d-flex justify-space-between align-center">
          <span class="card-title">Progress report</span>
          <v-spacer/>
          <v-icon large>mdi-chevron-right</v-icon>
        </v-card-text>
      </v-card>

      <v-card min-width="300" class="mr-3 mb-3" @click="showReport('diagnostic')">
        <v-card-text class="d-flex justify-space-between align-center">
          <span class="card-title">Diagnostic report</span>
          <v-spacer/>
          <v-icon large>mdi-chevron-right</v-icon>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { UserReport } from '@/interfaces/user-report';
import * as actionTypes from '@/store/actionTypes';

@Component
export default class Dashboard extends Vue {
  @Getter users!: UserReport[];

  selectedUser: UserReport | null = null;

  async mounted(): Promise<void> {
    await this.$store.dispatch(actionTypes.FETCH_USERS);
  }

  showReport(reportName: string): void {
    if (!this.selectedUser) {
      return alert('Please select user');
    }

    switch (reportName) {
      case 'user':
        this.$router.push(`/user-report/${this.selectedUser.id}`);
        break;
      case 'progress':
        this.$router.push(`/progress-report/${this.selectedUser.id}`);
        break;
      case 'diagnostic':
        this.$router.push(`/diagnostic-report/${this.selectedUser.id}`);
        break;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/colors";

.content {
  .user-selection {
    max-width: 400px;
    margin: 0 auto;
  }

  .cards-container {
    .card-title {
      font-size: 28px;
      color: $black;
    }
  }
}
</style>
