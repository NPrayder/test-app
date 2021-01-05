import { ReportState, RootState } from '@/interfaces/state';
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes';
import * as actionTypes from '@/store/actionTypes';
import { UserReport } from '@/interfaces/user-report';
import { reportService } from '@/services/report-service';
import { MapInfoStats } from '@/interfaces/map-info-stats';
import { AquilaReport } from '@/interfaces/aquila-report';

export const state: ReportState = {
    users: [],
    map: null,
    currentUser: null,
    diagnosticReport: null,
};

export const getters: GetterTree<ReportState, RootState> = {
    users: (state: ReportState) => state.users,
    map: (state: ReportState) => state.map,
    currentUser: (state: ReportState) => state.currentUser,
    diagnosticReport: (state: ReportState) => state.diagnosticReport,
};

export const mutations: MutationTree<ReportState> = {
    [mutationTypes.SET_USERS]: (state: ReportState, users: UserReport[]) => {
        state.users = users;
    },
    [mutationTypes.SET_CURRENT_USER]: (state: ReportState, user: UserReport | null) => {
        state.currentUser = user;
    },
    [mutationTypes.SET_REPORTS]: (state: ReportState, map: MapInfoStats) => {
        state.map = map;
    },
    [mutationTypes.SET_DIAGNOSTIC_REPORT]: (state: ReportState, report: AquilaReport) => {
        state.diagnosticReport = report;
    },
};

export const actions: ActionTree<ReportState, RootState> = {
    [actionTypes.FETCH_USERS]: async ({commit}: ActionContext<ReportState, RootState>) => {
        commit(mutationTypes.SET_USERS, []);
        const users = await reportService.fetchUsers();
        commit(mutationTypes.SET_USERS, users);
    },
    [actionTypes.FETCH_USER]:  async ({commit, state}: ActionContext<ReportState, RootState>, userId: number) => {
        commit(mutationTypes.SET_CURRENT_USER, null);

        if (!state.users.length) {
            const users = await reportService.fetchUsers();
            commit(mutationTypes.SET_USERS, users);
        }

        const currentUser = state.users.find(({id}: UserReport) => id === userId);
        commit(mutationTypes.SET_CURRENT_USER, currentUser);
    },
    [actionTypes.FETCH_REPORTS]: async ({commit}: ActionContext<ReportState, RootState>, userId: number) => {
        commit(mutationTypes.SET_REPORTS, null);
        const reports = await reportService.fetchReports(userId);
        commit(mutationTypes.SET_REPORTS, reports);
    },
    [actionTypes.FETCH_DIAGNOSTIC_REPORTS]: async ({commit}: ActionContext<ReportState, RootState>, userId: number) => {
        commit(mutationTypes.SET_DIAGNOSTIC_REPORT, []);
        const reports = await reportService.fetchDiagnosticReport(userId);
        commit(mutationTypes.SET_DIAGNOSTIC_REPORT, reports);
    },
};

export const report: Module<ReportState, RootState> = {
    state,
    getters,
    mutations,
    actions,
};

