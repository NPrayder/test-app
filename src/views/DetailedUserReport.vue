<template>
  <div v-if="currentUser" class="content">
    <v-card class="mx-auto" max-width="440">
      <v-card-title>{{ currentUser.name }}</v-card-title>

      <!-- Progress section -->
      <v-btn @click="showProgressSection= !showProgressSection" text style="width: 100%">
        <span class="section-title">Progress</span>
        <v-spacer/>
        <v-icon class="ml-auto">{{ showProgressSection ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-expand-transition>
        <div v-show="showProgressSection">
          <v-divider></v-divider>

          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Current level</div>
                    <span class="ml-auto result">{{ currentUser.currentLevel }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">User since</div>
                    <span class="ml-auto result">{{ getFormattedDate(currentUser.registrationDate) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-expand-transition>

      <!-- Current status section -->
      <v-btn @click="showCurrentStatus = !showCurrentStatus" text style="width: 100%">
        <span>Current status</span>
        <v-spacer/>
        <v-icon class="ml-auto">{{ showCurrentStatus ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-expand-transition>
        <div v-show="showCurrentStatus">
          <v-divider></v-divider>

          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Current Map Progress</div>
                    <span class="ml-auto result">{{ currentUser.currentMapProgress }}%</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Current Town</div>
                    <span class="ml-auto result">{{ currentUser.currentTown }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-expand-transition>

      <!-- Points section -->
      <v-btn @click="showPoints = !showPoints" text style="width: 100%">
        <span>Points</span>
        <v-spacer/>
        <v-icon class="ml-auto">{{ showPoints ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-expand-transition>
        <div v-show="showPoints">
          <v-divider></v-divider>

          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">XP points</div>
                    <span class="ml-auto result">{{ currentUser.xpPoints }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">XP Points Up this Map</div>
                    <span class="ml-auto result">{{ currentUser.xpPointsCurrentMap }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">ICP Points</div>
                    <span class="ml-auto result">{{ currentUser.icpPoints }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">ICP Points Up this Map</div>
                    <span class="ml-auto result">{{ currentUser.icpPointsCurrentMap }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Dictionary Words Unlocked</div>
                    <span class="ml-auto result">{{ currentUser.wordsInCurrentMap }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Dictionary Words this Map</div>
                    <span class="ml-auto result">{{ currentUser.countOfUnlockedWords }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-expand-transition>

      <!-- Team section -->
      <v-btn @click="showTeam = !showTeam" text style="width: 100%">
        <span>Team</span>
        <v-spacer/>
        <v-icon class="ml-auto">{{ showTeam ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-expand-transition>
        <div v-show="showTeam">
          <v-divider></v-divider>

          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Team</div>
                    <span class="ml-auto result">{{ getTeamName(currentUser.team) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Joined Team on</div>
                    <span class="ml-auto result">{{ getFormattedDate(currentUser.teamJoinDate) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-expand-transition>

      <!-- Current status section -->
      <v-btn @click="showTrackingOnMap = !showTrackingOnMap" text style="width: 100%">
        <span>Tracking on Map</span>
        <v-spacer/>
        <v-icon class="ml-auto">{{ showTrackingOnMap ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-expand-transition>
        <div v-show="showTrackingOnMap">
          <v-divider></v-divider>

          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Last login date</div>
                    <span class="ml-auto result">{{ getFormattedDate(currentUser.lastLoginDate) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Daily Average</div>
                    <span class="ml-auto result">{{ getFormattedDuration(currentUser.averageTime) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Average Sessions per day</div>
                    <span class="ml-auto result">{{ getFormattedDuration(currentUser.averageCountOfSessions) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Average Task Time</div>
                    <span class="ml-auto result">{{ getFormattedDuration(currentUser.averageTaskTime) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Average Dictionary Word Time Per Visit</div>
                    <span class="ml-auto result">{{ getFormattedDuration(currentUser.averageDictionaryWordTime) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <div class="item-title">Average Journal De Bord Time Per Visit</div>
                    <span class="ml-auto result">{{ getFormattedDuration(currentUser.averageJournalTime) }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import * as actionTypes from '@/store/actionTypes';
import { Team } from '@/interfaces/team';
import { UserReport } from '@/interfaces/user-report';
import * as helpers from '@/utils/helpers';

@Component
export default class DetailedUserReport extends Vue {
  @Getter currentUser!: UserReport;
  showProgressSection: boolean = false;
  showCurrentStatus: boolean = false;
  showPoints: boolean = false;
  showTeam: boolean = false;
  showTrackingOnMap: boolean = false;

  async mounted(): Promise<void> {
    const userId = this.$route.params.id;

    if (!userId) {
      await this.$router.push('/');
      return;
    }

    await this.$store.dispatch(actionTypes.FETCH_USER, +userId);

    if (!this.currentUser) {
      await this.$router.push('/');
      return;
    }
  }

  getFormattedDate(date: Date): string {
    return helpers.getFormattedDate(date);
  }

  getFormattedDuration(duration: number): string {
    return helpers.getFormattedDuration(duration);
  }

  getTeamName(team: Team): string {
    return helpers.getTeamName(team);
  }
}
</script>

<style scoped lang="scss">
.section-title {
  font-size: 16px;
}

.item-title {
  max-width: 60%;
  font-size: 14px;
}

.result {
  max-width: 40%;
  font-size: 14px;
}
</style>
