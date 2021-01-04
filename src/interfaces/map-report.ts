import { Status } from '@/interfaces/status';

export interface MapReport {
    id: number;
    name: string;
    status: Status;
    score: number;
    duration: number;
    dateOfAttempt: Date;
}
