import { WordStatus } from '@/interfaces/word-status';

export interface DictionaryReport {
    id: number;
    name: string;
    status: WordStatus;
    duration: number;
    timeOfAttempt: Date;
}
