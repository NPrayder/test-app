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
            :items="getItemsByCategory(item.name)"
        />
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { Status } from '@/interfaces/status';
import { DictionaryReport } from '@/interfaces/dictionary-report';
import { WordStatus } from '@/interfaces/word-status';
import * as helpers from '@/utils/helpers';

interface DictionaryTableFields {
  name: string;
  status: string;
  duration: string;
  dateOfAttempt: string;
  timeOfAttempt: string;
}

@Component
export default class DictionaryDetails extends Vue {
  @Prop({type: Array, required: true}) dictionaryReports!: DictionaryReport[];

  headers: DataTableHeader[] = [
    {text: '', value: 'data-table-expand', sortable: false},
    {text: 'Name', value: 'name', sortable: false},
    {text: 'Status', value: 'status', sortable: false},
    {text: 'Duration', value: 'duration', sortable: false},
    {text: 'Date of attempt', value: 'dateOfAttempt', sortable: false},
    {text: 'Time of attempt', value: 'timeOfAttempt', sortable: false},
  ];

  getGroupedRecords(): DictionaryTableFields[] {
    const groupedReports = this.getGroupedWords();
    const items = this.getTableItems(groupedReports);
    return this.getFormattedWords(items);
  }

  getItemsByCategory(category: string): DictionaryTableFields[] {
    return this.getFormattedWords(this.dictionaryReports.filter(({name}: DictionaryReport) => name === category))
  }

  getFormattedWords(items: DictionaryReport[]): DictionaryTableFields[] {
    return items.map(({timeOfAttempt, duration, status, ...rest}: DictionaryReport) => ({
      ...rest,
      duration: helpers.getFormattedDuration(duration),
      status: helpers.getFormattedWordStatus(status),
      dateOfAttempt: helpers.getFormattedDate(timeOfAttempt),
      timeOfAttempt: helpers.getFormattedTime(timeOfAttempt)
    }));
  }

  getTableItems(groupedReports: Map<string, DictionaryReport[]>): DictionaryReport[] {
    const actualReports: DictionaryReport[] = [];

    groupedReports.forEach((reports: DictionaryReport[]) => {
      const completedReport = reports.find(({status}: DictionaryReport) => status === WordStatus.LOCKED);

      if (!completedReport) {
        const latestReport = reports
            .sort((a: DictionaryReport, b: DictionaryReport) => a.timeOfAttempt > b.timeOfAttempt ? -1 : 1)[0];

        actualReports.push(latestReport);
      } else {
        actualReports.push(completedReport);
      }
    })

    return actualReports;
  }

  getGroupedWords(): Map<string, DictionaryReport[]> {
    const groupedReports = new Map<string, DictionaryReport[]>();

    if (!this.dictionaryReports?.length) {
      return new Map<string, DictionaryReport[]>();
    }

    this.dictionaryReports.forEach((report: DictionaryReport) => {
      const currentReportGroup = groupedReports.get(report.name);

      if (currentReportGroup) {
        groupedReports.set(report.name, currentReportGroup.concat(report));
      } else {
        groupedReports.set(report.name, [report])
      }
    });

    return groupedReports;
  }
}
</script>
