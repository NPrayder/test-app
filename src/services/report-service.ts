import { UserReport } from '@/interfaces/user-report';
import { Team } from '@/interfaces/team';
import { Status } from '@/interfaces/status';
import { MapInfoStats } from '@/interfaces/map-info-stats';
import { AquilaReport } from '@/interfaces/aquila-report';
import { WordStatus } from '@/interfaces/word-status';

const USER_REPORTS: UserReport[] = [
    {
        id: 1,
        name: 'Homer Simpson',
        currentLevel: 'A',
        registrationDate: new Date('12/12/2020'),
        currentMapProgress: 40,
        currentTown: 'Whitehorse',
        xpPoints: 500,
        xpPointsCurrentMap: 40,
        icpPoints: 300,
        icpPointsCurrentMap: 23,
        countOfUnlockedWords: 44,
        wordsInCurrentMap: 10,
        team: Team.EAST,
        teamJoinDate: new Date('12-20-2020'),
        lastLoginDate: new Date(),
        averageTime: 44,
        averageCountOfSessions: 12,
        averageTaskTime: 12,
        averageDictionaryWordTime: 12,
        averageJournalTime: 12,
    },
    {
        id: 2,
        name: 'Ned Flanders',
        currentLevel: 'A',
        registrationDate: new Date('12/12/2020'),
        currentMapProgress: 40,
        currentTown: 'Whitehorse',
        xpPoints: 500,
        xpPointsCurrentMap: 40,
        icpPoints: 300,
        icpPointsCurrentMap: 23,
        countOfUnlockedWords: 44,
        wordsInCurrentMap: 10,
        team: Team.EAST,
        teamJoinDate: new Date('12-20-2020'),
        lastLoginDate: new Date(),
        averageTime: 44,
        averageCountOfSessions: 12,
        averageTaskTime: 12,
        averageDictionaryWordTime: 12,
        averageJournalTime: 12,
    },
];

const MAP_REPORTS: MapInfoStats[] = [
    {
        id: 1,
        userId: 1,
        name: 'Whitehorse',
        dateStart: new Date('12-12-2020'),
        dateEnd: null,
        duration: 495,
        status: 'In Progress',
        progress: 70,
        reports: [
            {
                id: 2,
                name: 'The Alphabet',
                status: Status.ATTEMPTED,
                score: 74,
                duration: 10,
                dateOfAttempt: new Date('12-22-2020'),
            },
            {
                id: 1,
                name: 'The Alphabet',
                status: Status.ATTEMPTED,
                score: 19,
                duration: 10,
                dateOfAttempt: new Date('12-24-2020'),
            },
            {
                id: 3,
                name: 'SomethingOther',
                status: Status.COMPLETED,
                score: 48,
                duration: 10,
                dateOfAttempt: new Date('12-21-2020'),
            }
        ],
        dictionaryReports: [
            {
                id: 1,
                name: 'Sunshine',
                duration: 10,
                status: WordStatus.UNLOCKED,
                timeOfAttempt: new Date('12-20-2020'),
            },
            {
                id: 2,
                name: 'Sunshine',
                duration: 10,
                status: WordStatus.UNLOCKED,
                timeOfAttempt: new Date('12-20-2020'),
            },
            {
                id: 3,
                name: 'Moonshine',
                duration: 15,
                status: WordStatus.UNLOCKED,
                timeOfAttempt: new Date('12-17-2020'),
            },
            {
                id: 4,
                name: 'Moonshine',
                duration: 10,
                status: WordStatus.UNLOCKED,
                timeOfAttempt: new Date('12-20-2020'),
            },
            {
                id: 5,
                name: 'Moonshine',
                duration: 5,
                status: WordStatus.UNLOCKED,
                timeOfAttempt: new Date('12-21-2020'),
            }
        ],
    },
    {
        id: 2,
        userId: 1,
        name: 'Grey lake',
        dateStart: new Date('20-12-2020'),
        dateEnd: null,
        duration: 495,
        status: 'COMPLETED',
        progress: 70,
        reports: [
            {
                id: 1,
                name: 'Whitehorse',
                status: Status.ATTEMPTED,
                score: 200,
                duration: 10,
                dateOfAttempt: new Date('13-12-2020'),
            }
        ],
        dictionaryReports: [],
    }
];

const AQUILA_REPORT: AquilaReport = {
    acquiredAreas: {
        skills: [
            {
                skillId: "52",
                skillName: "Syntax",
                concepts: [
                    {
                        conceptId: "5962",
                        conceptName: "Asking Questions",
                        parentConceptId: ""
                    },
                    {
                        conceptId: "558",
                        conceptName: "W/h Questions",
                        parentConceptId: "5962"
                    }
                ]
            },
            {
                skillId: "11",
                skillName: "Grammar",
                concepts: [
                    {
                        conceptId: "45",
                        conceptName: "Determiners",
                        parentConceptId: ""
                    },
                    {
                        conceptId: "89",
                        conceptName: "Possessive Determiners",
                        parentConceptId: "45"
                    }
                ]
            }
        ]
    },
    areasBeingAcquired: {
        skills: [
            {
                skillId: "11",
                skillName: "Grammar",
                concepts: [
                    {
                        conceptId: "887",
                        conceptName: "Verbs",
                        parentConceptId: ""
                    },
                    {
                        conceptId: "885",
                        conceptName: "Verbs tenses/moods",
                        parentConceptId: "887"
                    },
                    {
                        conceptId: "21",
                        conceptName: "Present",
                        parentConceptId: "885"
                    },
                    {
                        conceptId: "22",
                        conceptName: "Simple Present",
                        parentConceptId: "21"
                    },
                    {
                        conceptId: "9",
                        conceptName: "Phrasal Verbs",
                        parentConceptId: "887"
                    },
                    {
                        conceptId: "1865",
                        conceptName: "Prepositions",
                        parentConceptId: ""
                    }
                ]
            },
            {
                skillId: "2",
                skillName: "Vocabulary",
                concepts: [
                    {
                        conceptId: "351",
                        conceptName: "Daily life / Multiple themes",
                        parentConceptId: ""
                    },
                    {
                        conceptId: "121",
                        conceptName: "Numbers time weather",
                        parentConceptId: "351"
                    }
                ]
            }
        ]
    }
};

const fetchUsers = (): Promise<UserReport[]> => {
    return Promise.resolve(USER_REPORTS);
};

const fetchReports = (userId: number): Promise<MapInfoStats> => {
    return Promise.resolve(MAP_REPORTS.filter((map: MapInfoStats) => map.userId === 1)[0]);
};

const fetchDiagnosticReport = (userId: number): Promise<AquilaReport> => {
    return Promise.resolve(AQUILA_REPORT);
}

export const reportService = {
    fetchUsers,
    fetchReports,
    fetchDiagnosticReport,
};
