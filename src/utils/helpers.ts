import moment from 'moment';
import { WordStatus } from '@/interfaces/word-status';
import { Status } from '@/interfaces/status';
import { Team } from '@/interfaces/team';

export function getFormattedDate(date: Date): string {
    return moment(date).format('L');
}

export function getFormattedTime(date: Date): string {
    return moment(date).format('LTS');
}

export function getFormattedDuration(duration: number): string {
    if (!duration) {
        return '0m';
    }

    // default format is PT{time} so we need remove PT
    return moment.duration(duration, 'minutes')
        .toISOString()
        .split('PT')[1]
        .toLowerCase();
}

export function getFormattedWordStatus(status: WordStatus): string {
    switch (status) {
        case WordStatus.UNLOCKED:
            return 'UNLOCKED';
        case WordStatus.LOCKED:
            return 'LOCKED';
    }
}

export function getFormattedTaskStatus(status: Status): string {
    switch (status) {
        case Status.ATTEMPTED:
            return 'ATTEMPTED';
        case Status.COMPLETED:
            return 'COMPLETED';
    }
}

export function getTeamName(team: number): string {
    switch (team) {
        case Team.EAST:
            return 'East';
        case Team.NORTH:
            return 'North';
        case Team.SOUTH:
            return 'South';
        case Team.WEST:
            return 'West';
        default:
            return 'North'
    }
}
