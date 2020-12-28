<template>
  <div class="content">
    <h1 class="page-title text-uppercase">Detailed report #{{ reportId }}</h1>
    <v-divider class="divider"/>

    <div class="data-table mt-3">
      <v-data-table
          :headers="dessertHeaders"
          :items="desserts"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          hide-default-footer
          item-key="id"
          show-expand
          class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-menu
              left
              offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                  v-for="i in 3"
                  :key="i"
              >
                <v-list-item-title>Action {{ i }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-0">
            <v-data-table
                :headers="dessertHeaders"
                :items="item.history"
                item-key="id"
                hide-default-header
                hide-default-footer
            />
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ReportDetails extends Vue {
  reportId: number = 0;

  expanded = [];
  singleExpand = false;
  dessertHeaders = [
    {text: '', value: 'data-table-expand'},
    {text: '#', value: 'id'},
    {text: 'Name', value: 'name'},
    {text: 'Score (%)', value: 'score'},
    {text: 'Duration (hh:mm:ss)', value: 'duration'},
    {text: 'Date and Time Accessed', value: 'accessTime'},
    {text: 'Action', value: 'action'},
  ];
  desserts = [
    {
      id: 1,
      name: 'Jelly bean',
      score: 0,
      duration: '00:00:01',
      accessTime: '18/11/2020 09:57:10 AM',
      history: [
        {
          id: 1,
          name: 'KitKat',
          score: 24,
          duration: '00:00:01',
          accessTime: '18/11/2020 09:57:10 AM',
        },
        {
          id: 2,
          name: 'Milka',
          score: 24,
          duration: '00:30:01',
          accessTime: '19/11/2020 09:57:10 AM',
        }
      ]
    },
    {
      id: 2,
      name: 'Car 1',
      score: 0,
      duration: '00:00:01',
      accessTime: '18/11/2020 09:57:10 AM',
      history: [
        {
          id: 1,
          name: 'Car 2',
          score: 24,
          duration: '00:00:01',
          accessTime: '18/11/2020 09:57:10 AM',
        },
        {
          id: 2,
          name: 'Car 3',
          score: 24,
          duration: '00:30:01',
          accessTime: '19/11/2020 09:57:10 AM',
        }
      ]
    },
  ];

  created() {
    this.reportId = +this.$route.params.id;
  }
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

  ::v-deep {
    .v-data-table__expanded__content {
      box-shadow: none !important;
    }
  }
}
</style>
