import { MapReport } from '@/interfaces/map-report';
import { DictionaryReport } from '@/interfaces/dictionary-report';

export interface MapInfoStats {
    id: number;
    userId: number;
    name: string;
    dateStart: Date;
    dateEnd: Date | null;
    duration: number;
    status: string;
    progress: number;
    reports: MapReport[];
    dictionaryReports: DictionaryReport[];
}
