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
    team: number;
    teamJoinDate: Date;
    lastLoginDate: Date;
    averageTime: number;
    averageCountOfSessions: number;
    averageTaskTime: number;
    averageDictionaryWordTime: number;
    averageJournalTime: number;
}
