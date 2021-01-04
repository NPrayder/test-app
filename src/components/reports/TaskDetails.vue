<template>
  <v-data-table
      :headers="headers"
      hide-default-footer
      show-expand
      :items="getGroupedRecords()"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pa-0">
        <v-data-table
            :headers="headers"
            hide-default-footer
            hide-default-header
            expand-icon=""
            show-expand
            :items="getItemsByCategory(item.name)"
        />
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { MapReport } from '@/interfaces/map-report';
import { Status } from '@/interfaces/status';
import * as helpers from '@/utils/helpers';

interface TaskTableFields {
  name: string;
  status: string;
  score: string;
  duration: string;
  dateOfAttempt: string;
}

@Component
export default class TaskDetails extends Vue {
  @Prop({type: Array, required: true}) mapReports!: MapReport[];

  headers: DataTableHeader[] = [
    {text: '', value: 'data-table-expand', sortable: false},
    {text: 'Name', value: 'name', sortable: false},
    {text: 'Status', value: 'status', sortable: false},
    {text: 'Score', value: 'score', sortable: false},
    {text: 'Duration', value: 'duration', sortable: false},
    {text: 'Date of attempt', value: 'dateOfAttempt', sortable: false},
  ];

  getGroupedRecords(): any[] {
    const groupedRecords = this.getGroupedItems();
    const items = this.getLatestAttempts(groupedRecords);
    return this.getFormattedRecords(items);
  }

  getItemsByCategory(category: string): TaskTableFields[] {
    return this.getFormattedRecords(this.mapReports.filter(({name}: MapReport) => name === category))
  }

  getFormattedRecords(items: MapReport[]): TaskTableFields[] {
    return items.map(({duration, dateOfAttempt, status, score, ...rest}: MapReport) => ({
      ...rest,
      score: `${score}%`,
      status: helpers.getFormattedTaskStatus(status),
      duration: helpers.getFormattedDuration(duration),
      dateOfAttempt: helpers.getFormattedDate(dateOfAttempt)
    }));
  }

  getLatestAttempts(groupedRecords: Map<string, MapReport[]>): MapReport[] {
    const actualReports: MapReport[] = [];

    groupedRecords.forEach((reports: MapReport[]) => {
      const completedReport = reports.find(({status}: MapReport) => status === Status.COMPLETED);

      if (!completedReport) {
        const latestReport = reports.sort((a: MapReport, b: MapReport) => {
          return a.dateOfAttempt > b.dateOfAttempt ? -1 : 1
        })[0];

        actualReports.push(latestReport);
      } else {
        actualReports.push(completedReport);
      }
    })

    return actualReports;
  }

  getGroupedItems(): Map<string, MapReport[]> {
    const groupedRecords = new Map<string, MapReport[]>();

    if (!this.mapReports?.length) {
      return new Map<string, MapReport[]>();
    }

    this.mapReports.forEach((report: MapReport) => {
      const currentReportGroup = groupedRecords.get(report.name);

      if (currentReportGroup) {
        groupedRecords.set(report.name, currentReportGroup.concat(report));
      } else {
        groupedRecords.set(report.name, [report])
      }
    });

    return groupedRecords;
  }
}
</script>
