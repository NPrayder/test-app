import { Team } from '@/interfaces/Team';

export interface UserReport {
    id: number;
    name: string;
    currentLevel: string;
    registrationDate: Date;
    currentMapProgress: number;
    currentTown: string;
    xpPoints: number;
    xpPointsCurrentMap: number;
    icpPoints: number;
    icpPointsCurrentMap: number;
    countOfUnlockedWords: number;
    wordsInCurrentMap: number;
    team: Team;
    teamJoinDate: Date;
    lastLoginDate: Date;
    averageTime: number;
    averageCountOfSessions: number;
    averageTaskTime: number;
    averageDictionaryWordTime: number;
    averageJournalTime: number;
}
