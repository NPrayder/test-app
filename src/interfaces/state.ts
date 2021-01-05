import { UserReport } from '@/interfaces/user-report';
import { MapInfoStats } from '@/interfaces/map-info-stats';
import { AquilaReport } from '@/interfaces/aquila-report';

export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    token: string | null;
}

export interface ReportState {
    users: UserReport[];
    map: MapInfoStats | null;
    currentUser: UserReport | null;
    diagnosticReport: AquilaReport | null;
}

export interface RootState {
    auth: AuthState;
    reports: ReportState;
}
