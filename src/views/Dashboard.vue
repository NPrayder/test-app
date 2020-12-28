<template>
  <div class="dashboard-container">
    <v-navigation-drawer
        permanent
        :mini-variant="isCollapsedDrawer"
        color="#272727"
        class="drawer"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title name">
              <h1 class="title-text white-text">Op LENTUS</h1>
              <h1 class="title-text yellow-text">SIM - SLO</h1>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="divider"></v-divider>

      <v-list
          nav
          dense
      >
        <v-list-item class="menu-item" to="/reports" active-class="active">
          <v-list-item-icon>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Report</v-list-item-title>
        </v-list-item>
        <v-list-item class="menu-item" to="/actions" active-class="active">
          <v-list-item-icon>
            <v-icon>mdi-image-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Another section</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="divider"></v-divider>

      <v-list nav dense>
        <v-list-item class="menu-item" to="/settings" active-class="active">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list nav dense class="collapse-btn">
        <v-list-item class="menu-item" active-class="active" @click="isCollapsedDrawer = !isCollapsedDrawer">
          <v-list-item-icon>
            <v-icon>{{ isCollapsedDrawer ? 'mdi-arrow-right-drop-circle' : 'mdi-arrow-left-drop-circle' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Collapse menu</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar
        flat
        color="#3D3D3D"
        class="header"
    >
      <v-spacer/>
      <v-avatar color="#111" size="40px">
        <span class="white-text">ST</span>
      </v-avatar>
      <span class="font-weight-bold ml-2 white-text username-text">{{ username }}</span>
    </v-app-bar>

    <div class="content">
      <div class="container d-flex flex-column justify-space-between align-center">
        <div class="page-content">
          <router-view/>
        </div>

        <footer class="footer white d-flex align-center px-4">
          <span>© Copyright Techinnov 2021</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class Dashboard extends Vue {
  @Getter username!: string;

  isCollapsedDrawer: boolean = true;
}
</script>

<style scoped lang="scss">
@import "../assets/styles/colors";

.dashboard-container {
  display: grid;
  grid-template-areas: "drawer header" "drawer content";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  .header {
    grid-area: header;
    position: sticky;
    top: 0;

    .username-text {
      font-size: 20px;
    }
  }

  .content {
    grid-area: content;
    background-color: $white;

    .container {
      width: 100%;
      height: 100%;

      .page-content {
        width: 100%;
      }

      .footer {
        width: 100%;
        height: 50px;
        border-radius: 11px;
        margin: 12px 20px;
      }
    }
  }

  .drawer {
    grid-area: drawer;
    position: sticky;
    top: 0;
    max-height: 100vh;
    min-height: 100vh;

    .name {
      padding: 0 4px;
      margin: 0 0 28px;
    }

    .v-divider {
      border-color: $white;
    }

    .v-list-item.menu-item {
      .v-list-item__title {
        color: $white;
        font-size: 16px;
      }

      .v-icon {
        color: #7B7B7B;
      }

      &.active {
        background-color: rgba($yellow, 0.15);

        .v-list-item__title, .v-icon {
          color: $yellow;
        }
      }
    }

    .collapse-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
