<template>
  <div v-if="diagnosticReport">
    <v-expansion-panels accordion multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>Acquired areas</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-treeview
              hoverable
              :items="acquiredAreas"
          ></v-treeview>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Areas being acquired</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-treeview
              hoverable
              :items="areasBeingAcquired"
          ></v-treeview>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { AquilaConcept, AquilaReport, AquilaSkill, TreeViewReport } from '@/interfaces/aquila-report';
import * as actionTypes from '@/store/actionTypes';

@Component
export default class DiagnosticReport extends Vue {
  acquiredAreas: TreeViewReport[] = [];
  areasBeingAcquired: TreeViewReport[] = [];

  @Getter diagnosticReport!: AquilaReport;

  async mounted(): Promise<void> {
    await this.$store.dispatch(actionTypes.FETCH_DIAGNOSTIC_REPORTS);

    this.acquiredAreas = this.buildTreeObject(this.diagnosticReport.acquiredAreas.skills);
    this.areasBeingAcquired = this.buildTreeObject(this.diagnosticReport.areasBeingAcquired.skills);
  }

  buildTreeObject(skills: AquilaSkill[]): TreeViewReport[] {
    return skills.map((skill: AquilaSkill) => {
      const formattedSkill: TreeViewReport = {id: skill.skillId, name: skill.skillName, children: []};

      const formattedConcepts: TreeViewReport[] = skill.concepts.map((concept: AquilaConcept) => ({
        id: concept.conceptId,
        name: concept.conceptName,
        children: [],
        parentConcept: concept.parentConceptId,
      }));

      formattedConcepts.forEach((concept: TreeViewReport) => {
        if (!concept.parentConcept) {
          return;
        }

        const parentConcept = formattedConcepts.find(({id}: TreeViewReport) => concept.parentConcept === id);
        if (parentConcept) {
          parentConcept.children.push(concept);
        }
      })

      formattedSkill.children = formattedConcepts
          .filter(({parentConcept}: TreeViewReport) => !parentConcept?.length);

      return formattedSkill;
    });
  }
}
</script>
