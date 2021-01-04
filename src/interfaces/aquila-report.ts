export interface AquilaConcept {
    conceptId: string;
    conceptName: string;
    parentConceptId: string;
}

export interface AquilaSkill {
    skillId: string;
    skillName: string;
    concepts: AquilaConcept[];
}

export interface TreeViewReport {
    id: string;
    name: string;
    children: TreeViewReport[];
    parentConcept?: string;
}

export interface AquilaReport {
    acquiredAreas: { skills: AquilaSkill[] };
    areasBeingAcquired: { skills: AquilaSkill[] };
}
